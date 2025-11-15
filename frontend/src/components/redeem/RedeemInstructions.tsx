
export const RedeemInstructions = () => {
  return (
    <div className="bg-gray-50 border p-6 rounded-lg max-w-2xl mx-auto">
      <h3 className="font-semibold text-center mb-4">📋 How to Redeem</h3>

      <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
        <div>
          <div className="text-2xl">📷</div>
          <p>Scan the QR on your voucher</p>
        </div>
        <div>
          <div className="text-2xl">⌨️</div>
          <p>Or type the voucher code manually</p>
        </div>
        <div>
          <div className="text-2xl">⚡</div>
          <p>Receive Bitcoin instantly</p>
        </div>
      </div>
    </div>
  );
};
