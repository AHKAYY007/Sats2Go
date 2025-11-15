import { useState, useEffect } from "react";
import { VoucherDisplay } from "./VoucherDisplay";
import { Voucher } from "@/interface/merchant";
import { VoucherForm } from "./VoucherForm";

export default function MerchantDashboard() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/vouchers/`);
      if (!res.ok) throw new Error("Failed to load vouchers");

      const data = await res.json();
      const now = new Date();

      const activeVouchers = data
        .filter((v: any) => {
          const expiresAt = new Date(v.voucher.expires_at + "Z"); // parse as UTC
          return v.voucher.status === "active" && expiresAt > now;
        })
        .slice(0, 5);

      setVouchers(activeVouchers);
    } catch (err) {
      console.error("Fetch vouchers failed", err);
    } finally {
      setLoading(false);
    }
  };

  fetchVouchers();
}, []);

  return (
    <div className="mt-10 space-y-4">
      <VoucherForm
        onGenerated={(newVoucher) => {
          const expires = new Date(newVoucher.voucher.expires_at);
          if (expires > new Date()) {
            setVouchers((prev) => [newVoucher, ...prev].slice(0, 5));
          }
        }}
      />

      {loading ? (
        <p className="text-center text-gray-500">Loading vouchers...</p>
      ) : vouchers.length === 0 ? (
        <p className="text-center text-gray-500">No active vouchers found.</p>
      ) : (
        <VoucherDisplay vouchers={vouchers} />
      )}
    </div>
  );
}