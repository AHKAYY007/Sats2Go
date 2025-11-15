import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRedemption } from "@/components/redeem/redeemvoucher";
import MerchantDashboard from "@/components/merchant/merchantdashboard";
import herolightning from "../assets/herolightning.jpg";
import Image from "next/image";

const AppPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("redeem");

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium"
          >
            ← Back to Home
          </button>

          <div className="flex items-center gap-2">
            <div className=" rounded-md ">
              <Image
                src={herolightning}
                alt=""
                height={70}
                width={70}
                className="rounded-md"
              />
            </div>
            <span className="text-3xl font-bold text-orange-500">Sats2Go</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-center">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("redeem")}
              className={`px-8 py-3 font-medium border-b-2 transition-colors ${
                activeTab === "redeem"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              🔓 Redeem Voucher
            </button>
            <button
              onClick={() => setActiveTab("merchant")}
              className={`px-8 py-3 font-medium border-b-2 transition-colors ${
                activeTab === "merchant"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              🏪 Merchant Portal
            </button>
          </div>
        </div>

        {activeTab === "redeem" && <UserRedemption />}
        {activeTab === "merchant" && <MerchantDashboard />}
      </main>
    </div>
  );
};

export default AppPage;
