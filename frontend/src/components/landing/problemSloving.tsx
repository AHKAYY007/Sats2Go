import React from 'react'

export default function ProblemSloving() {
  return (
    <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Problem Column */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                The Problem with Bitcoin in Africa
              </h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">•</span>
                  <p className="text-lg">Expensive transaction fees make small purchases impossible</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">•</span>
                  <p className="text-lg">Limited internet access blocks wallet usage</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">•</span>
                  <p className="text-lg">Complex wallet setup intimidates newcomers</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">•</span>
                  <p className="text-lg">No simple onramp for cash-based economies</p>
                </div>
              </div>
            </div>
            
            {/* Solution Column */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-orange-500">
                The Sats2Go Solution
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl font-bold mt-1">✓</span>
                  <p className="text-lg text-gray-600">Lightning-fast transactions with minimal fees</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl font-bold mt-1">✓</span>
                  <p className="text-lg text-gray-600">Buy offline, redeem when you have internet</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl font-bold mt-1">✓</span>
                  <p className="text-lg text-gray-600">No wallet needed at purchase time</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl font-bold mt-1">✓</span>
                  <p className="text-lg text-gray-600">Familiar scratch card experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
