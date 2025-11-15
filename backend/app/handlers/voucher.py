from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.voucher import Voucher, VoucherCreate, VoucherRedeem
from app.models.status import VoucherStatus
import qrcode
import io
from app.lightning.lnbits import create_lnurl_withdraw, LNBitsError
import base64
from PIL import Image
from sqlmodel import select
from datetime import datetime, timedelta
from core.config import settings
from typing import List

webhook_url="http://localhost:8000/webhooks/lnbits"


def generate_QR(data: str) -> str:
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    img: Image.Image = qr.make_image(fill_color="black", back_color="white")

    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    qr_base64 = base64.b64encode(buffered.getvalue()).decode()

    return f"data:image/png;base64,{qr_base64}"


async def get_all_vouchers(db: AsyncSession) -> List[Voucher]:
    statement = select(Voucher)
    result = await db.execute(statement)
    return result.scalars().all()


async def create_voucher(req: VoucherCreate, db: AsyncSession):
    """Create a voucher WITHOUT LNURL. LNURL is only created on redemption."""

    if req.amount <= 0:
        raise HTTPException(
            status_code=400,
            detail="Voucher amount must be greater than zero.",
        )

    new_voucher = Voucher(
        amount=req.amount,
        expires_at=datetime.utcnow() + timedelta(minutes=3)
    )
    db.add(new_voucher)
    await db.commit()
    await db.refresh(new_voucher)

    qr_code = generate_QR(new_voucher.code)

    return new_voucher, qr_code


async def redeem_voucher(req: VoucherRedeem, db: AsyncSession) -> dict:
    result = await db.execute(select(Voucher).where(Voucher.code == req.code))
    voucher = result.scalars().first()

    if not voucher:
        raise HTTPException(404, "Voucher not found.")

    if voucher.status != VoucherStatus.ACTIVE:
        raise HTTPException(400, f"Voucher already {voucher.status}.")

    if voucher.expires_at and voucher.expires_at < datetime.utcnow():
        voucher.status = VoucherStatus.EXPIRED
        await db.commit()
        raise HTTPException(400, "Voucher has expired.")

    # mark as redeeming
    voucher.status = VoucherStatus.REDEEMED
    await db.commit()
    await db.refresh(voucher)

    try:
        lnurl_obj = await create_lnurl_withdraw(
            amount=voucher.amount,
            memo=f"Sats2Go voucher {voucher.code}",
            uses=1,
            webhook_url=f"{webhook_url}/webhooks/lnbits"
        )

        k1 = lnurl_obj.get("k1")
        if not k1:
            raise LNBitsError("LNBits did not return k1")

        voucher.user_wallet = k1
        await db.commit()
        await db.refresh(voucher)

        lnurl_value = lnurl_obj.get("lnurl")

        qr = generate_QR(lnurl_value)

        return {
            "voucher_code": voucher.code,
            "status": "ready_to_claim",
            "amount": voucher.amount,
            "lnurl": lnurl_value,
            "qr_base64": qr,
            "message": "Scan with any Lightning LNURL-withdraw wallet to claim your sats."
        }

    except Exception as e:
        voucher.status = VoucherStatus.ACTIVE
        await db.commit()
        raise HTTPException(500, f"Error creating LNURL: {e}")


async def get_voucher_by_code(code: str, db: AsyncSession) -> Voucher:
    result = await db.execute(select(Voucher).where(Voucher.code == code))
    voucher = result.scalars().first()

    if not voucher:
        raise HTTPException(404, "Voucher not found.")

    return voucher
