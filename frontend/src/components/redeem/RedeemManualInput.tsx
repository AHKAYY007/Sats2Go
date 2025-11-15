import { Dispatch, SetStateAction } from "react";

interface Props {
  voucherCode: string;
  setVoucherCode: Dispatch<SetStateAction<string>>;
  lightningWallet: string;
  setLightningWallet: Dispatch<SetStateAction<string>>;
  loading: boolean;
  onRedeem: () => void;
  onScan: () => void;
  canScan: boolean
}

export const RedeemManualInput = ({
  voucherCode,
  setVoucherCode,
  lightningWallet,
  setLightningWallet,
  loading,
  onRedeem,
  onScan,
  canScan,
}: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
      <div className="space-y-4">
        {/* Voucher Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Voucher Code
          </label>
          <input
            type="text"
            placeholder="SATS-XXXX-XXXX"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border rounded-md font-mono text-center"
          />
        </div>

        {/* Lightning Wallet */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lightning Wallet
          </label>
          <input
            type="text"
            placeholder="user@ln.tips"
            value={lightningWallet}
            onChange={(e) => setLightningWallet(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Redeem Button */}
        <button
          onClick={onRedeem}
          disabled={loading || !voucherCode || !lightningWallet}
          className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "⏳ Redeeming..." : "🚀 Redeem Voucher"}
        </button>
      </div>
    </div>
  );
};
