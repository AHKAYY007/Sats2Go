import { useState } from "react";
import { toast } from "sonner";
import { RedeemInstructions } from "./RedeemInstructions";
import { RedeemManualInput } from "./RedeemManualInput";
import { RedeemResult } from "./RedeemResult";
import { QRScanner } from "./RedeemScanner";

export const UserRedemption = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [lightningWallet, setLightningWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [redemptionResult, setRedemptionResult] = useState<any>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);

  const fetchVoucherDetails = async (code: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vouchers/${code}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch voucher details");
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching voucher details:", error);
      return null;
    }
  };

  const redeemVoucher = async (code: string, wallet: string) => {
    if (!code.trim()) return toast.error("Please enter a voucher code");
    if (!wallet.trim()) return toast.error("Please enter a Lightning wallet");

    setLoading(true);

    try {
      const redeemResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vouchers/redeem`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, user_wallet: wallet }),
        }
      );

      const redeemData = await redeemResponse.json();
      console.log("Redemption API Response:", redeemData);

      if (!redeemResponse.ok) {
        const errorMessage = 
          redeemData.detail ||
          redeemData.detail?.[0]?.msg ||
          redeemData.message ||
          "Voucher redemption failed";
        
        throw new Error(errorMessage);
      }
      const voucherDetails = await fetchVoucherDetails(code);
      console.log("Voucher Details:", voucherDetails);

      setRedemptionResult({
        success: true,
        message: "Voucher redeemed successfully!",
        code: redeemData.code || redeemData.voucher?.code || code,
        wallet: redeemData.user_wallet || redeemData.voucher?.user_wallet || wallet,
        amount: voucherDetails?.voucher?.amount || voucherDetails?.amount || null,
        expires_at: voucherDetails?.voucher?.expires_at,
        created_at: voucherDetails?.voucher?.created_at,
        status: voucherDetails?.voucher?.status,
      });

      toast.success("🎉 Voucher redeemed!");
      setVoucherCode("");
    } catch (error: any) {
      console.error("Redemption error:", error);
      setRedemptionResult({
        success: false,
        message: error.message || "Invalid or already redeemed voucher",
      });
      toast.error("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleManualRedeem = () => {
    redeemVoucher(voucherCode, lightningWallet);
  };
  const handleQRRedemption = (scannedCode: string) => {
    if (!lightningWallet.trim()) {
      toast.error("Please enter your Lightning wallet first");
      setShowQRScanner(false);
      return;
    }
    
    redeemVoucher(scannedCode, lightningWallet);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">🔓 Redeem Voucher</h1>
        <p className="text-gray-600 mt-2">
          Enter your wallet + scan QR code or enter code manually
        </p>
      </div>

      <RedeemManualInput
        voucherCode={voucherCode}
        setVoucherCode={setVoucherCode}
        lightningWallet={lightningWallet}
        setLightningWallet={setLightningWallet}
        loading={loading}
        onRedeem={handleManualRedeem}
        onScan={() => setShowQRScanner(true)}
        canScan={!!lightningWallet.trim()}
      />
      {redemptionResult && <RedeemResult result={redemptionResult} />}

      <RedeemInstructions />

      {showQRScanner && (
        <QRScanner
          onRedeem={handleQRRedemption}
          onClose={() => setShowQRScanner(false)}
          loading={loading}
        />
      )}
    </div>
  );
};