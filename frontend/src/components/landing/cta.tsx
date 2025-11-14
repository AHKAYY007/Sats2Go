import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import React from 'react'

interface IProps{
    router:AppRouterInstance
}

export default function Cta({router}: IProps) {
  return (
    <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="p-12 text-center rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 shadow-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Start?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join the Bitcoin revolution in Africa with Sats2Go
            </p>
            <button 
              onClick={() => router.push("/app")}
              className="bg-white text-orange-500 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              Launch App Now →
            </button>
          </div>
        </div>
      </section>
  )
}
