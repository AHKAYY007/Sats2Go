import { Voucher } from "@/interface/merchant";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  onGenerated: (v: Voucher) => void;
}

export const VoucherForm = ({ onGenerated }: IProps) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const generateVoucher = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vouchers/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: parseFloat(amount) }),
        }
      );

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      console.log("API Response:", data); 
      const voucher: Voucher = {
        voucher: {
          code: data.voucher.code,
          amount: data.voucher.amount,
          status: data.voucher.status,
          redeemed_at: data.voucher.redeemed_at,
          expires_at: data.voucher.expires_at,
          created_at: data.voucher.created_at,
          user_wallet: data.voucher.user_wallet,
        },
        qr_code: data.qr_code,
      };

      onGenerated(voucher);
      setAmount("");
      toast.success("Voucher generated successfully!");
    } catch (error) {
      console.error("Voucher generation error:", error);
      toast.error("Failed to generate voucher. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Create New Voucher</h2>

      <div className="space-y-4 max-w-lg mx-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (SATS)
          </label>
          <input
            type="number"
            placeholder="10000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          onClick={generateVoucher}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 disabled:bg-orange-300"
        >
          {loading ? "⏳ Generating..." : "🎫 Generate Voucher"}
        </button>
      </div>
    </div>
  );
};