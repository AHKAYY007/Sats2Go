

interface Props {
  result: {
    success: boolean;
    message: string;
    code?: string;
    wallet?: string;
    amount?: number;
    expires_at?: string;
    created_at?: string;
    status?: string;
  };
}

export const RedeemResult = ({ result }: Props) => {
  console.log("Redeem Result:", result);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      className={`bg-white border rounded-lg p-6 max-w-md mx-auto ${
        result.success ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
      }`}
    >
      <div className="text-center">
        <h3 className={`text-xl font-semibold mb-2 ${result.success ? "text-green-700" : "text-red-700"}`}>
          {result.success ? "Success!" : "Failed"}
        </h3>
        <p className={`mb-4 ${result.success ? "text-green-600" : "text-red-600"}`}>
          {result.message}
        </p>

        {result.success && (
          <div className="space-y-3">
            {/* Amount Received */}
            <div className="bg-white rounded p-4 border">
              <p className="text-sm text-gray-600">Amount Received</p>
              <p className="text-2xl font-bold text-green-600">
                {result.amount ? `${result.amount.toLocaleString()} SATS` : "-"}
              </p>
            </div>

            {/* Lightning Wallet */}
            <div className="bg-white rounded p-4 border">
              <p className="text-sm text-gray-600 mb-2">Lightning Wallet</p>
              <p className="font-mono text-orange-600 break-all">{result.wallet}</p>
            </div>

            {/* Voucher Code */}
            <div className="bg-white rounded p-4 border">
              <p className="text-sm text-gray-600 mb-2">Voucher Code</p>
              <p className="font-mono text-sm break-all">{result.code}</p>
            </div>

            {/* Additional Details */}
            {result.expires_at && (
              <div className="bg-white rounded p-3 border text-xs text-gray-600">
                <p><span className="font-semibold">Redeemed:</span> {formatDate(result.created_at || new Date().toISOString())}</p>
                <p><span className="font-semibold">Status:</span> {result.status || "redeemed"}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};