import { Handbag, Menu, User } from "lucide-react"

function NavBar() {
  return (
    <div className="fixed top-0 py-5 left-12 right-12 flex justify-between items-center bg-white z-10">
        <Menu className="w-6 cursor-pointer"/>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-center font-bold uppercase text-2xl">UrbanVibe</h1>
        <div className="flex items-center gap-4">
          <input type="text" placeholder="Search products..." className="border border-t-0 border-x-0 text-sm w-40 outline-none px-1 py-0.5"/>
          <User className="w-5 cursor-pointer" />
          <Handbag className="w-5 cursor-pointer"/>
        </div>
      </div>
  )
}

export default NavBar