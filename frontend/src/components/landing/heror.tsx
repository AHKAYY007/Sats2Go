import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import React from 'react'

interface IProps{
    router:AppRouterInstance
}
export default function Hero({router}: IProps) {
  return (
     <section className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium border border-orange-200">
            Offline Lightning Vouchers
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6  ">
          Buy Bitcoin Sats
          <br />
          <span className="text-orange-500">
            Without Internet
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          The first offline Lightning voucher system for Africa. 
          As simple as buying airtime scratch cards.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => router.push("/app")}
            className="bg-orange-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            Get Started →
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-50 transition-colors">
            Learn More
          </button>
        </div>
      </section>
  )
}
