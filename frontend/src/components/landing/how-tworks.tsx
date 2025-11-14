import { steps } from '@/const/landing'
import React from 'react'

export default function HowItWorks() {
  return (
   <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Three simple steps to own Bitcoin sats
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="p-8 text-center border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl font-bold text-orange-500/30 mb-6">{step.number}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
