from fastapi import APIRouter, status, Depends
from app.handlers.voucher import create_voucher, redeem_voucher, get_voucher_by_code, get_all_vouchers
from core.session import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.voucher import VoucherCreate, VoucherRedeem, Voucher
from typing import List, Dict


router = APIRouter(
    prefix="/vouchers",
    tags=["vouchers"],
)


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_new_voucher(req: VoucherCreate, db: AsyncSession = Depends(get_session)):
    """Endpoint to create a new voucher."""

    voucher, code = await create_voucher(req, db)
    return {
        "voucher": voucher, 
        "qr_code": code
    }



@router.post("/redeem", status_code=status.HTTP_200_OK)
async def redeem_vouchers(
    req: VoucherRedeem, 
    db: AsyncSession = Depends(get_session)
):
    """Endpoint to redeem a voucher code."""
    response = await redeem_voucher(req, db)
    return response



@router.get("/{code}")
async def get_voucher_info(code: str, db: AsyncSession = Depends(get_session)):
    """Endpoint to get voucher details by code."""

    voucher = await get_voucher_by_code(code, db)
    return voucher


@router.get('/', response_model=List[Dict])
async def get_vouchers(db: AsyncSession = Depends(get_session)):
    """Endpoint to return all vouchers"""

    vouchers = await get_all_vouchers(db)
    return vouchers