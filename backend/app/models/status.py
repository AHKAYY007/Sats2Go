from pydantic import BaseModel
from enum import Enum
from datetime import datetime
from typing import Optional

class VoucherStatus(str, Enum):
    """Enumeration for voucher statuses."""

    ACTIVE = "active"
    REDEEMED = "redeemed"
    EXPIRED = "expired"


class VoucherResponse(BaseModel):
    """Response model for voucher operations."""

    code: str
    amount: int
    status: VoucherStatus
    created_at: datetime
    redeemed_at: Optional[datetime] = None

    class Config:
        from_attributes = True