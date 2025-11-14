import { useState, useRef } from "react";
import { toast } from "sonner";

export const UserRedemption = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [redemptionResult, setRedemptionResult] = useState<any>(null);
  const [showScanner, setShowScanner] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const redeemVoucher = async (code = voucherCode) => {
    if (!code.trim()) {
      toast.error("Please enter a voucher code");
      return;
    }

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const success = Math.random() > 0.2;
      
      if (success) {
        const amount = 1000;
        setRedemptionResult({
          success: true,
          amount: amount,
          currency: "NGN",
          message: "Voucher redeemed successfully!",
          lightningInvoice: `lnbc${amount}n1p...real-lightning-invoice`
        });
        toast.success("🎉 Voucher redeemed! Bitcoin is on its way!");
        setVoucherCode("");
        setShowScanner(false);
      } else {
        setRedemptionResult({
          success: false,
          message: "Invalid or already redeemed voucher code"
        });
        toast.error("❌ Invalid voucher code");
      }
    } catch (error) {
      toast.error("⚠️ Redemption failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    toast.info("📸 Simulating QR code scan...");
    
    setTimeout(() => {
      // Mock QR code data extraction
      const mockScannedCode = `SATS-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      setVoucherCode(mockScannedCode);
      toast.success(`QR code scanned: ${mockScannedCode}`);
      redeemVoucher(mockScannedCode);
    }, 1000);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">🔓 Redeem Voucher</h1>
        <p className="text-gray-600 mt-2">Scan QR code or enter code to claim Bitcoin sats</p>
      </div>

      {/* QR Code Scanner Option */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
        <div className="text-center mb-4">
          <button
            onClick={() => setShowScanner(!showScanner)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 flex items-center justify-center gap-2 mx-auto"
          >
            📷 {showScanner ? "Hide QR Scanner" : "Scan QR Code"}
          </button>
        </div>

        {showScanner && (
          <div className="space-y-4 p-4 border border-blue-200 rounded-lg bg-blue-50">
            <p className="text-sm text-blue-700 text-center">
              📸 Take a photo of your voucher's QR code
            </p>
            
            <div className="text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                capture="environment"
                className="hidden"
                id="qr-upload"
              />
              <label
                htmlFor="qr-upload"
                className="bg-white border border-blue-500 text-blue-500 px-6 py-4 rounded-lg font-medium hover:bg-blue-50 cursor-pointer inline-block"
              >
                📁 Upload QR Code Image
              </label>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>or use your phone's camera to scan</p>
            </div>

            <div className="border-t border-blue-200 pt-4">
              <p className="text-xs text-blue-600 text-center">
                💡 Tip: Ensure good lighting and hold steady for best results
              </p>
            </div>
          </div>
        )}

        <div className="text-center my-4">
          <p className="text-gray-500">- OR -</p>
        </div>

        {/* Manual Code Entry */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Voucher Code Manually
            </label>
            <input
              type="text"
              placeholder="SATS-XXXX-XXXX-XXXX"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-center font-mono text-lg"
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-2">
              Type the code from your scratch card
            </p>
          </div>

          <button 
            onClick={() => redeemVoucher()}
            disabled={loading || !voucherCode.trim()}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 text-lg"
          >
            {loading ? "⏳ Verifying..." : "🚀 Redeem Now"}
          </button>
        </div>
      </div>

      {/* Redemption Result */}
      {redemptionResult && (
        <div className={`bg-white border rounded-lg p-6 max-w-md mx-auto ${
          redemptionResult.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
        }`}>
          <div className="text-center">
            <div className="text-4xl mb-4">
              {redemptionResult.success ? '🎉' : '❌'}
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${
              redemptionResult.success ? 'text-green-700' : 'text-red-700'
            }`}>
              {redemptionResult.success ? "Success!" : "Failed"}
            </h3>
            <p className={`mb-4 ${
              redemptionResult.success ? 'text-green-600' : 'text-red-600'
            }`}>
              {redemptionResult.message}
            </p>
            
            {redemptionResult.success && (
              <div className="space-y-3">
                <div className="bg-white rounded p-4 border">
                  <p className="text-sm text-gray-600">Amount Received</p>
                  <p className="text-2xl font-bold text-green-600">
                    {redemptionResult.amount} {redemptionResult.currency}
                  </p>
                </div>
                
                {/* Show QR code for Lightning invoice */}
                <div className="bg-white rounded p-4 border">
                  <p className="text-sm text-gray-600 mb-2">Lightning Invoice QR</p>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(redemptionResult.lightningInvoice)}`}
                    alt="Lightning Invoice QR"
                    className="mx-auto border border-gray-300 rounded"
                  />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(redemptionResult.lightningInvoice);
                      toast.success("Invoice copied to clipboard!");
                    }}
                    className="w-full mt-2 bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-600"
                  >
                    📋 Copy Invoice
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto">
        <h3 className="font-semibold text-gray-900 mb-4 text-center">📋 How to Redeem</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <p><strong>Scan QR Code</strong><br/>Use camera to scan voucher QR</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">⌨️</div>
            <p><strong>Or Enter Code</strong><br/>Type code manually</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            <p><strong>Get Bitcoin</strong><br/>Receive sats instantly!</p>
          </div>
        </div>
      </div>
    </div>
  );
};