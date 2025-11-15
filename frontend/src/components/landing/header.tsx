import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import herolightning from "../../assets/herolightning.jpg"
import Image from 'next/image'

interface IProps{
    router:AppRouterInstance
}
export default function Header({router}: IProps) {
  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className=" rounded-md ">
              <Image src={herolightning}  alt="" height={80} width={80} className='rounded-md' />

            </div>
            <span className="text-3xl font-bold text-orange-500">
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
