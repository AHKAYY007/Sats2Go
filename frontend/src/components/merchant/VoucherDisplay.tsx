import { Voucher } from "@/interface/merchant";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  vouchers: Voucher[];
}

export const VoucherDisplay = ({ vouchers }: IProps) => {
  const [showQRCodeIndex, setShowQRCodeIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

 const printVoucher = (voucher: Voucher) => {
  const printWindow = window.open("", "_blank");
  const html = `
    <div style="text-align: center; padding: 20px; font-family: Arial;">
      <h1 style="color:#f97316">🎫 Sats2Go Voucher</h1>
      <h2>${voucher.voucher.amount} SATS</h2>
      <img src="${voucher.qr_code}" style="margin-top:20px; max-width: 300px;"/>
      <p style="margin-top: 20px; font-family: monospace; font-size: 16px;">${voucher.voucher.code}</p>
    </div>
    <script>
      window.onafterprint = function() {
        window.close();
      };
      setTimeout(() => {
        if (!window.closed) {
          window.close();
        }
      }, 5000);
    </script>
  `;
  printWindow?.document.write(html);
  printWindow?.document.close();
  printWindow?.print();
};

  const copyCode = async (voucher: Voucher, index: number) => {
    const codeToCopy = voucher?.voucher?.code;
    
    if (codeToCopy) {
      try {
        await navigator.clipboard.writeText(codeToCopy);
        
        setCopiedIndex(index);
        toast.success("Voucher code copied!");
        
        setTimeout(() => {
          setCopiedIndex(null);
        }, 2000);
        
      } catch (err) {
        console.error("Failed to copy:", err);
        toast.error("Failed to copy voucher code");
      }
    } else {
      toast.error("No voucher code to copy");
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {vouchers.slice(0, 5).map((voucher, index) => (
          <div key={voucher.voucher.code} className="bg-white border border-orange-200 rounded-lg p-6 shadow-lg w-full">
            <h3 className="text-center font-semibold mb-3">Voucher Created</h3>

            <div className="border border-dashed border-orange-400 p-4 mb-4">
              <p className="text-gray-600 text-sm">Amount</p>
              <p className="text-lg font-semibold mt-2 text-orange-600">
                {voucher.voucher.amount.toLocaleString()} SATS
              </p>
              <p className="text-gray-600 text-sm mt-4">Voucher Code</p>
              <p className="font-mono font-bold text-sm mt-1 break-all">
                {voucher.voucher.code}
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setShowQRCodeIndex(index)}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                🔍 Show QR Code
              </button>

              <button
                onClick={() => printVoucher(voucher)}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
              >
                🖨️ Print Voucher
              </button>

              <button
                onClick={() => copyCode(voucher, index)}
                className={`w-full border py-2 rounded transition-colors ${
                  copiedIndex === index
                    ? "bg-green-500 text-white border-green-500"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {copiedIndex === index ? (
                  <span className="flex items-center justify-center gap-2">
                    ✅ Copied!
                  </span>
                ) : (
                  "📋 Copy Code"
                )}
              </button>
            </div>
            {showQRCodeIndex === index && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center">
                  <h3 className="text-center font-semibold mb-3">Scan to Redeem</h3>
                  <p className="text-gray-600 text-sm mb-4">{voucher.voucher.amount.toLocaleString()} SATS</p>
                  <img 
                    src={voucher.qr_code} 
                    className="mx-auto border-2 border-orange-300 p-2 mb-4 w-full max-w-64"
                    alt="Voucher QR Code"
                  />
                  <button
                    onClick={() => setShowQRCodeIndex(null)}
                    className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};