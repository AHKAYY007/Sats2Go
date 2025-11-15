import { useState } from "react";
import { VoucherDisplay } from "./VoucherDisplay";
import { Voucher } from "@/interface/merchant";
import { VoucherForm } from "./VoucherForm";

export default function MerchantDashboard() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);


  return (
    <div className="mt-10 space-y-8">
      <VoucherForm
        onGenerated={(newVoucher) =>
          setVouchers((prev) => [newVoucher, ...prev])
        }
      />

      {vouchers.length > 0 && <VoucherDisplay vouchers={vouchers} />}
    </div>
  );
}
