import { useState } from "react";
import { toast } from "sonner";

export const MerchantDashboard = () => {
  const [amount, setAmount] = useState("");
  // const [currency, setCurrency] = useState("NGN");
  const [loading, setLoading] = useState(false);
  const [generatedVoucher, setGeneratedVoucher] = useState<any>(null);
  const [showQRCode, setShowQRCode] = useState(false);

  const generateVoucher = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/v1/vouchers/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount)
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Use the actual data from your API response
      const voucher = {
        code: data.code || data.voucher_code, // Adjust based on your API response
        amount: parseFloat(amount),
        createdAt: new Date().toISOString(),
        qrData: data.qr_data || `sats2go:${data.code}` // Use API data if available
      };
      
      setGeneratedVoucher(voucher);
      setShowQRCode(false);
      toast.success("Voucher generated successfully!");
      
    } catch (error) {
      console.error('Voucher generation error:', error);
      toast.error("Failed to generate voucher. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Rest of the component remains the same...
  const printVoucher = () => {
    if (!generatedVoucher) return;
    
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(generatedVoucher.qrData)}`;
    const printContent = `
      <div style="text-align: center; padding: 20px; font-family: Arial; max-width: 400px; margin: 0 auto;">
        <h1 style="color: #f97316;">🎫 Sats2Go Voucher</h1>
        <div style="border: 2px dashed #f97316; padding: 20px; margin: 20px 0; border-radius: 10px;">
          <h2 style="color: #f97316; font-size: 24px; margin: 0;">${generatedVoucher.amount} ${generatedVoucher.currency}</h2>
          <p style="font-size: 14px; color: #666; margin: 10px 0;">Voucher Code:</p>
          <p style="font-size: 18px; letter-spacing: 2px; font-weight: bold; margin: 10px 0;">${generatedVoucher.code}</p>
          
          <div style="margin: 20px 0;">
            <img src="${qrCodeUrl}" alt="QR Code" style="border: 1px solid #ddd; padding: 10px; background: white;" />
            <p style="font-size: 12px; color: #666; margin-top: 10px;">Scan to redeem</p>
          </div>
        </div>
        
        <div style="text-align: left; font-size: 12px; color: #666; margin-top: 20px;">
          <p><strong>Instructions:</strong></p>
          <ol style="margin: 10px 0; padding-left: 20px;">
            <li>Scan QR code or visit sats2go.app/redeem</li>
            <li>Enter voucher code: ${generatedVoucher.code}</li>
            <li>Receive Bitcoin sats instantly!</li>
          </ol>
        </div>
        
        <hr style="margin: 20px 0;">
        <p style="font-size: 10px; color: #999;">
          Created: ${new Date().toLocaleDateString()} | Sats2Go - Bitcoin for Africa
        </p>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const showQRCodeModal = () => {
    setShowQRCode(true);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">🏪 Merchant Portal</h1>
        <p className="text-gray-600 mt-2">Generate Bitcoin vouchers for offline sales</p>
      </div>

      {/* Voucher Generation */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Create New Voucher</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
             Amount
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="10000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <button 
            onClick={generateVoucher}
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "⏳ Generating..." : "🎫 Generate Voucher"}
          </button>
        </div>
      </div>

      {/* Generated Voucher Display */}
      {generatedVoucher && (
        <div className="bg-white border border-orange-200 rounded-lg p-6 max-w-md mx-auto shadow-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">✅ Voucher Ready!</h3>
            
            {/* Voucher Details */}
            <div className="border-2 border-dashed border-orange-300 rounded-lg p-4 mb-4 bg-orange-50">
              <p className="text-sm text-gray-600">Voucher Code</p>
              <p className="text-2xl font-mono font-bold text-orange-600 my-2">
                {generatedVoucher.code}
              </p>
              <p className="text-lg font-semibold">
                {generatedVoucher.amount} {generatedVoucher.currency}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button 
                onClick={showQRCodeModal}
                className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 flex items-center justify-center gap-2"
              >
                📱 Show QR Code
              </button>
              
              <button 
                onClick={printVoucher}
                className="w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 flex items-center justify-center gap-2"
              >
                🖨️ Print Voucher
              </button>
              
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(generatedVoucher.code);
                  toast.success("Code copied to clipboard!");
                }}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                📋 Copy Code
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Give this code to customer. They can redeem at sats2go.app/redeem
            </p>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRCode && generatedVoucher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">📱 Voucher QR Code</h3>
              
              <div className="mb-4 flex justify-center">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generatedVoucher.qrData)}`}
                  alt="Voucher QR Code"
                  className="border border-gray-300 rounded-lg p-2 bg-white"
                />
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                Scan this QR code to redeem {generatedVoucher.amount} {generatedVoucher.currency}
              </p>
              
              <button 
                onClick={() => setShowQRCode(false)}
                className="w-full bg-orange-500 text-white py-2 rounded-md font-medium hover:bg-orange-600 mt-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};