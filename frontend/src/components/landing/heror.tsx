import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import lightningImage from "../../assets/lightning.jpg"

interface IProps{
    router:AppRouterInstance
}
export default function Hero({router}: IProps) {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-4 py-16 md:py-24"
      style={{
        backgroundImage: `url(${lightningImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-orange-500/90 text-white text-sm font-medium border border-orange-300 backdrop-blur-sm">
            Offline Lightning Vouchers
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Buy Bitcoin Sats
          <br />
          <span className="text-orange-400">
            Without Internet
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-8 leading-relaxed backdrop-blur-sm bg-black/20 p-4 rounded-lg">
          The first offline Lightning voucher system for Africa. 
          As simple as buying airtime scratch cards.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => router.push("/app")}
            className="bg-orange-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            Get Started →
          </button>
          <button className="border border-white/50 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-white/10 transition-colors backdrop-blur-sm">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}