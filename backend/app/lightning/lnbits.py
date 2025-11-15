import httpx
from core.config import settings

LNBITS_ADMIN_KEY = settings.LNBITS_ADMIN_KEY
LNBITS_WALLET_ID = settings.LNBITS_WALLET_ID

BASE_URL = "https://demo.lnbits.com"


class LNBitsError(Exception):
    pass


async def create_lnurl_withdraw(amount: int, memo: str, uses: int = 1, webhook_url: str = None):
    """
    Create an LNURL-withdraw link using LNbits demo server.
    """
    url = f"{BASE_URL}/withdraw/api/v1/links"

    payload = {
        "title": memo,
        "min_withdrawable": amount * 1000,  # lnurl uses msats
        "max_withdrawable": amount * 1000,
        "uses": uses,
        "wait_time": 1,
        "is_unique": True,
        "webhook_url": webhook_url,
    }

    headers = {
        "X-Api-Key": LNBITS_ADMIN_KEY,
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, headers=headers)

    if response.status_code >= 400:
        raise LNBitsError(f"LNbits error: {response.text}")

    data = response.json()

    # unify LNbits fields
    return {
        "id": data["id"],
        "lnurl": data.get("lnurl"),
        "k1": data.get("k1"),
        "encoded": data.get("lnurl"),
        "url": data.get("lnurl"),
    }
