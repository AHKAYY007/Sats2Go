import { toast } from "sonner";

interface VoucherCardProps {
  code: string;
  amount: number;
  currency: string;
  createdAt: string;
  status: "active" | "redeemed" | "expired";
}
export const VoucherCard = ({ code, amount, currency, createdAt, status }: VoucherCardProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast.success("Voucher code copied!");
  };

  const printVoucher = () => {
    const printWindow = window.open('', '', 'width=600,height=400');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Sats2Go Voucher</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
              .voucher { border: 2px solid #F7931A; padding: 30px; max-width: 400px; margin: 0 auto; }
              .code { font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0; color: #F7931A; }
              .amount { font-size: 20px; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="voucher">
              <h1>Sats2Go Voucher</h1>
              <div class="amount">${amount} ${currency}</div>
              <div class="code">${code}</div>
              <p>Redeem at sats2go.app</p>
              <p style="font-size: 12px;">Created: ${new Date(createdAt).toLocaleDateString()}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const statusColors = {
    active: "bg-orange-100 text-orange-800",
    redeemed: "bg-gray-100 text-gray-800",
    expired: "bg-red-100 text-red-800"
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm text-gray-600">Voucher Code</p>
          <p className="text-2xl font-mono font-bold tracking-wider text-gray-900">{code}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Amount</p>
          <p className="font-semibold text-gray-900">{amount} {currency}</p>
        </div>
        <div>
          <p className="text-gray-600">Created</p>
          <p className="font-semibold text-gray-900">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button 
          onClick={copyToClipboard} 
          className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          📋 Copy
        </button>
        <button 
          onClick={printVoucher} 
          className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          🖨️ Print
        </button>
        <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
          📱 QR
        </button>
      </div>
    </div>
  );
};