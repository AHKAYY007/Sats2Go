import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial, sans-serif" }}>
      <h1>🪙 Welcome to Sats2Go</h1>
      <p style={{ fontSize: "18px", margin: "20px 0" }}>
        Send and redeem Bitcoin Lightning vouchers instantly — online or offline.
      </p>

      <div style={{ marginTop: "30px" }}>
        <Link href="/dashboard">
          <button style={{ padding: "15px 30px", fontSize: "16px", marginRight: "20px" }}>
            Merchant Dashboard
          </button>
        </Link>
        <Link href="/redeem">
          <button style={{ padding: "15px 30px", fontSize: "16px" }}>
            Redeem Voucher
          </button>
        </Link>
      </div>

      <section style={{ marginTop: "50px" }}>
        <h2>💡 How it Works</h2>
        <ol style={{ textAlign: "left", display: "inline-block", marginTop: "20px", fontSize: "16px" }}>
          <li>Create a voucher (merchant)</li>
          <li>Print or share QR code</li>
          <li>Scan or enter code (user)</li>
          <li>Instant Lightning redemption</li>
          <li>Track redemption in real-time</li>
        </ol>
      </section>
    </div>
  );
}
