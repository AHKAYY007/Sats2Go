# ⚡ Sats2Go – Offline Bitcoin Lightning Vouchers for Africa

## 📖 Description

**Sats2Go** is an innovative solution that bridges the gap between **offline users** and the **Bitcoin Lightning Network**.  
It enables users in areas with limited or unstable internet access to **buy, hold, and redeem Bitcoin Lightning vouchers** through local agents, Telegram bots, or a lightweight web app.

---

## 🧠 Problem Statement
In many parts of Africa:
- Internet access is unreliable.  
- Most users transact with **cash or mobile money**, not crypto.  
- Lightning wallets require constant online access.  

As a result, **Lightning adoption** is limited — even among people who want to use Bitcoin.

---

## 💡 Solution
Sats2Go introduces **redeemable Lightning vouchers** that allow anyone to access sats, even without a permanent internet connection.

### How it works:
1. **Vendors** generate vouchers by funding them via Lightning.
2. **Users** buy these vouchers offline using cash or mobile money.
3. When the user goes online, they **redeem** the voucher using a web app or Telegram bot to receive sats in their wallet.

✅ **Offline-to-online bridge**  
✅ **Simple for vendors & users**  
✅ **Secure, fast, and verifiable**  

---

## 🌍 Use Cases
- **Rural merchants**: Sell vouchers as a gateway to Lightning.
- **Remittances**: Send vouchers instead of direct on-chain transfers.
- **Educational incentives**: Reward learners with redeemable sats.
- **Event tickets & promotions**: Distribute Bitcoin rewards offline.

---

## ⚙️ Implementation Overview

### 🔹 Architecture
```
Frontend (Web App / Telegram Bot)
        ↓
FastAPI Backend (Voucher Service)
        ↓
LNBits API (Lightning Payments)
        ↓
Bitcoin Lightning Network
```

### 🔹 Workflow
1. Vendor requests voucher → FastAPI generates invoice → LNBits funds it.  
2. FastAPI stores voucher code & amount in the database.  
3. User redeems code → FastAPI sends sats to user wallet using LNBits API.  

---

## 🧩 Technologies Used

| Layer | Technology |
|--------|-------------|
| **Backend** | FastAPI (Python) |
| **Lightning Integration** | LNBits API / Alby API |
| **Database** | SQLite / PostgreSQL |
| **Frontend** | HTML, TailwindCSS, JavaScript |
| **QR Generation** | Python `qrcode` |
| **Deployment** | Railway / Render / Vercel |

---

## 🚀 Backend API Endpoints

### `POST /create_voucher`
Create a funded voucher for a specified amount.

**Request Body:**
```json
{
  "amount": 1000
}
```

**Response:**
```json
{
  "code": "3f91a0f9-91a7-4f98-b1c2-7e2a8d89e211",
  "qr_url": "https://api.qrserver.com/v1/create-qr-code/?data=3f91a0f9..."
}
```

---

### `POST /redeem_voucher`
Redeem a voucher and send sats to a Lightning wallet.

**Request Body:**
```json
{
  "code": "3f91a0f9-91a7-4f98-b1c2-7e2a8d89e211",
  "user_wallet": "you@ln.tips"
}
```

**Response:**
```json
{
  "message": "Voucher redeemed successfully. Sats sent to wallet!"
}
```

---

### `GET /voucher/{code}`
Check voucher status.

**Response:**
```json
{
  "code": "3f91a0f9-91a7-4f98-b1c2-7e2a8d89e211",
  "amount": 1000,
  "status": "active"
}
```

---

## 🎨 Frontend Stack
- **TailwindCSS** for a sleek UI  
- **Vanilla JS** for API calls  
- **Responsive design** for mobile users  
- **Optional**: Telegram bot integration using Python’s `python-telegram-bot`

---

## 🧠 Example User Flow
1. **Vendor** opens `sats2go.app` → enters sats amount → generates QR voucher.  
2. **User** buys the printed voucher offline.  
3. Later, the **user** visits the web app → enters voucher code & Lightning address → sats instantly credited.  

---

## 🤝 How to Contribute

We welcome community contributions!  

### Steps:
1. **Fork** the repository  
2. Create a new branch  
   ```bash
   git checkout -b feature/my-feature
   ```
3. **Commit** your changes  
   ```bash
   git commit -m "Add new feature"
   ```
4. **Push** and open a Pull Request  
   ```bash
   git push origin feature/my-feature
   ```
5. The maintainers will review your PR 💪

### Areas to Contribute
- Improving Lightning API integration  
- Adding SMS redemption flow  
- Enhancing QR-based UX  
- Translating UI to local African languages  

---

## 🧱 Project Setup

### Backend
```bash
git clone https://github.com/yourusername/sats2go.git
cd sats2go/backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
Open `index.html` in your browser and point the API base URL to your FastAPI server:
```js
const API_BASE = "http://localhost:8000";
```

---

## 🏁 Future Improvements
- SMS-based voucher redemption (via Twilio / Africa’s Talking)  
- Lightning escrow for merchant verification  
- NFC-enabled offline voucher cards  
- Multi-language support (Swahili, Hausa, Yoruba, Zulu, etc.)

---

## 📜 License
This project is licensed under the **MIT License** — free for use, modification, and distribution.

---

## ✨ Summary Pitch
> **Sats2Go** bridges Africa’s offline communities with the Bitcoin Lightning Network — enabling anyone, anywhere, to turn cash into instant, borderless money.
