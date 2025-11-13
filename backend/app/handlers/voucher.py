from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.voucher import Voucher, VoucherCreate
from app.models.status import VoucherStatus
import qrcode
import io
import base64
from PIL import Image
from sqlmodel import select
from datetime import datetime, timedelta

# Helper to generate QR code for a voucher
def generate_QR(data: str) -> str:
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    # Use Pillow to make image
    img: Image.Image = qr.make_image(fill_color="black", back_color="white")
    img.show()

    # Save to bytes buffer
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    qr_base64 = base64.b64encode(buffered.getvalue()).decode()

    return f"data:image/png;base64,{qr_base64}"


# --- Handlers --- #
async def create_voucher(req: VoucherCreate, db: AsyncSession) -> Voucher:
    """Handler to create a new voucher."""
    
    if req.amount <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Voucher amount must be greater than zero.",
        )


    new_voucher = Voucher(
        amount=req.amount,
        expires_at=datetime.utcnow() + timedelta(days=7)
    )
    db.add(new_voucher)
    await db.commit()
    await db.refresh(new_voucher)

    # Generate QR code for the voucher
    code = generate_QR(new_voucher.code)
    return new_voucher, code



async def redeem_voucher(code: str, wallet: str, db: AsyncSession) -> dict:
    """Handler to redeem a voucher code."""

    result = await db.execute(select(Voucher).where(Voucher.code == code))
    voucher = result.scalars().first()

    if not voucher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Voucher not found.",
        )
    
    if voucher.status != VoucherStatus.ACTIVE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Voucher has already been redeemed."
        )
    
    if voucher.expires_at and voucher.expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=400, 
            detail="Voucher has expired."
        )


    # TODO: Implement Bitcoin Lightning payment check here
    # Example: verify invoice/payment associated with this voucher
    # lightning_payment_successful = await check_lightning_payment(voucher.code)
    # if not lightning_payment_successful:
    #     raise HTTPException(
    #         status_code=status.HTTP_402_PAYMENT_REQUIRED,
    #         detail="Lightning payment not completed."
    #     )

    # Redeem the voucher
    voucher.status = VoucherStatus.REDEEMED
    voucher.user_wallet = wallet
    voucher.redeemed_at = datetime.utcnow()

    db.add(voucher)
    await db.commit()
    await db.refresh(voucher)

    # TODO: Trigger any post-redemption logic for Lightning
    # Example: settle invoice, notify user, or log redemption

    return {
        "message": f"{voucher.amount} $sats sent to {wallet}."
    }
    


async def get_voucher_by_code(code: str, db: AsyncSession) -> Voucher:
    """Handler to get a voucher by its code."""

    result = await db.execute(select(Voucher).where(Voucher.code == code))
    voucher = result.scalars().first()

    if not voucher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Voucher not found.",
        )

    return voucher