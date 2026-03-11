import type { FunctionComponent } from "react"
import BottomNav from "./BottomNav"
import Header from "./Header"
import { Outlet } from "react-router-dom"


const Content: FunctionComponent = () => {

  return (
    <main className="dark:bg-gray-950 bg-white min-h-screen w-full overflow-auto pb-16 md:pb-10" >
      <Header userImg={null} />
      <Outlet />
      <BottomNav />
    </main>
  )
}

export default Content
