from fastapi import APIRouter, Request, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from core.session import get_session
from app.models.voucher import Voucher, VoucherStatus
from sqlalchemy.future import select
from datetime import datetime

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


@router.post("/lnbits", status_code=200)
async def lnbits_webhook(request: Request, db: AsyncSession = Depends(get_session)):
    """
    LNBits calls this webhook when a withdraw succeeds.
    Resilient to empty bodies and non-JSON payloads.
    """

    # Try reading JSON
    try:
        data = await request.json()
        if not isinstance(data, dict):
            data = {}
    except Exception:
        data = {}
        print("LNBits webhook: empty or non-JSON payload received")

    print("LNBits webhook payload:", data)

    # Extract LNBits withdraw identifier
    k1 = data.get("k1")
    status_val = data.get("status")

    if not k1:
        # Ignore calls without k1 (could be empty/demo ping)
        print("LNBits webhook called without k1, ignoring")
        return {"message": "Webhook received, no k1"}

    # Lookup voucher by stored k1
    result = await db.execute(select(Voucher).where(Voucher.user_wallet == k1))
    voucher = result.scalars().first()

    if not voucher:
        print(f"Unknown k1 received: {k1}")
        return {"message": "Voucher not found for k1"}

    # Only mark as redeemed if LNBits reports completed
    if status_val != "completed":
        print(f"LNBits webhook received, withdraw not completed: status={status_val}")
        return {"message": "Webhook received but withdraw not completed"}

    # Idempotent: only update if not already redeemed
    if voucher.status != VoucherStatus.REDEEMED:
        voucher.status = VoucherStatus.REDEEMED
        voucher.redeemed_at = datetime.utcnow()
        await db.commit()
        print(f"Voucher {voucher.code} marked as REDEEMED via LNBits webhook")
    else:
        print(f"Voucher {voucher.code} already redeemed")

    return {"message": "Voucher processed successfully"}
