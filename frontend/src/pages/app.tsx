import { useState } from "react";
import { useRouter } from "next/navigation";
import { MerchantDashboard } from "@/components/merchantdashboard";
import { UserRedemption } from "@/components/redeemvoucher";

const AppPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("redeem");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex justify-between gap-4">

            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              ← Back to Home
            </button>
            <div className="flex items-center gap-2">
             <div className=" text-orange-500 text-4xl ">₿</div>
              <span className="text-2xl font-bold text-gray-900">
                Sats2Go
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("redeem")}
              className={`px-6 py-3 font-medium border-b-2 ${
                activeTab === "redeem" 
                  ? "border-orange-500 text-orange-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              🔓 Redeem Voucher
            </button>
            <button
              onClick={() => setActiveTab("merchant")}
              className={`px-6 py-3 font-medium border-b-2 ${
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

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { MerchantDashboard } from "@/components/merchantdashboard";
// import { UserRedemption } from "@/components/redeemvoucher";

// const AppPage = () => {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("redeem");

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
//         <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => router.push('/')}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
//             >
//               ← Back
//             </button>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 text-orange-500 text-xl">₿</div>
//               <span className="text-2xl font-bold text-gray-900">
//                 Sats2Go
//               </span>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-6xl mx-auto px-4 py-8">
//         <div className="mb-8">
//           <div className="flex border-b border-gray-200">
//             <button
//               onClick={() => setActiveTab("redeem")}
//               className={`px-4 py-2 font-medium text-sm border-b-2 ${
//                 activeTab === "redeem" 
//                   ? "border-orange-500 text-orange-600" 
//                   : "border-transparent text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Redeem Voucher
//             </button>
//             <button
//               onClick={() => setActiveTab("merchant")}
//               className={`px-4 py-2 font-medium text-sm border-b-2 ${
//                 activeTab === "merchant" 
//                   ? "border-orange-500 text-orange-600" 
//                   : "border-transparent text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Merchant Dashboard
//             </button>
//           </div>
//         </div>
        
//         {activeTab === "redeem" && <UserRedemption />}
//         {activeTab === "merchant" && <MerchantDashboard />}
//       </main>
//     </div>
//   );
// };

// export default AppPage;