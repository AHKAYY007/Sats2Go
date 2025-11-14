import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import React from 'react'

interface IProps{
    router:AppRouterInstance
}
export default function Header({router}: IProps) {
  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className=" text-orange-500 text-4xl ">₿</div>
            <span className="text-2xl font-bold text-gray-900">
              Sats2Go
            </span>
          </div>
          <button 
            onClick={() => router.push("/app")}
            className="bg-orange-500 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors"
          >
            Launch App
          </button>
        </div>
      </header>
  )
}
