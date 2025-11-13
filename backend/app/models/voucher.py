from pydantic import BaseModel
from datetime import datetime
from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from typing import Optional
from .status import VoucherStatus

class VoucherCreate(BaseModel):
    """Model for creating a voucher."""

    amount: int  # in sats


class VoucherRedeem(BaseModel):
    """Model for redeeming a voucher."""

    code: str
    user_wallet: str  # LNURL or Lightning address


class VoucherBase(BaseModel):
    """Model representing a voucher."""

    code: str
    amount: int
    status: VoucherStatus
    created_at: datetime
    redeemed_at: datetime | None = None


class Voucher(SQLModel, table=True):
    """SQLModel for Voucher table."""

    amount: int
    code: str = Field(default_factory=lambda: str(uuid4()), primary_key=True, index=True)
    status: VoucherStatus = Field(default=VoucherStatus.ACTIVE)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    redeemed_at: datetime | None = Field(default=None, nullable=True)
    user_wallet: str | None = Field(default=None, nullable=True)
    expires_at: datetime | None = Field(default=None, nullable=True)