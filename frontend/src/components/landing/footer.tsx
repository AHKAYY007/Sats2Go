import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className=" text-orange-500 text-4xl ">₿</div>
                <span className="text-xl font-bold text-gray-900">Sats2Go</span>
              </div>
              <p className="text-sm text-gray-600">Offline Lightning vouchers for Africa</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500 transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">For Merchants</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">For Users</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>© 2025 Sats2Go. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}
