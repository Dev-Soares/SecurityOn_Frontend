import Sidebar from "../shared/layouts/Sidebar"
import Content from "../shared/layouts/Content"

const MainPage = () => {
  return (
    <main className="flex min-h-screen w-full flex-row items-center justify-between 2xl:pl-32 bg-white dark:bg-gray-950">
        <Sidebar />
        <Content />
    </main>
  )
}

export default MainPage
