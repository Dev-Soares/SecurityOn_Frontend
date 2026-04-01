import type { FunctionComponent } from "react"
import BottomNav from "./BottomNav"
import Header from "./Header"
import { Outlet } from "react-router-dom"


const Content: FunctionComponent = () => {

  return (
    <main className="dark:bg-gray-950 bg-white min-h-dvh w-full pb-20 md:pb-10" >
      <Header />
      <Outlet />
      <BottomNav />
    </main>
  )
}

export default Content
