import type { FunctionComponent } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import SidebarButton from "../components/SidebarButton"
import ProfileCard from "../components/ProfileCard"
import { UsersIcon, FileTextIcon, SignInIcon, FlagIcon } from "@phosphor-icons/react"
import LogoIcon from "../components/LogoIcon"


const Sidebar: FunctionComponent = () => {

  const navigateTo = useNavigate();
  const location = useLocation();

  return (

    <aside className='hidden lg:flex sticky top-0  overflow-none h-screen lg:w-[40%] xl:w-[32%] px-8 py-10   bg-white text-blue-500 dark:bg-gray-950 dark:text-white dark:border-gray-900 border-r border-gray-200  overflow-hidden self-start
    justify-between flex-col'>
      <div className="flex justify-start items-center">
        <LogoIcon size={80}/>
        <h1 className="text-2xl font-medium">SecurityOn</h1>
      </div>
      <div className="flex flex-col justify-start items-start  gap-4">
        <SidebarButton text="Comunidade" route="/community" iconOutline={<UsersIcon size={32} weight="regular" />} iconFilled={<UsersIcon size={32} weight="fill" />} isSelected={location.pathname === '/community'} />
        <SidebarButton text="Artigos" route="/articles" iconOutline={<FileTextIcon size={32} weight="regular" />} iconFilled={<FileTextIcon size={32} weight="fill" />} isSelected={location.pathname === '/articles'} />
        <SidebarButton text="Denúncias" route="/complaint" iconOutline={<FlagIcon size={32} weight="regular" />} iconFilled={<FlagIcon size={32} weight="fill" />} isSelected={location.pathname === '/complaint'} />
        
      </div>
      <div className="flex flex-col gap-6 justify-center items-center w-full">
        <button onClick={() => navigateTo('/login')}
        className="flex justify-center items-center gap-3 w-full font-semibold  p-3 text-white bg-blue-500 border-blue-500 border-2 hover:bg-white hover:text-blue-500 hover:dark:bg-gray-900 hover:translate-y-[-2px] transition-all duration-300 rounded-4xl text-xl! font-normal cursor-pointer ">
          <SignInIcon size={32} weight="regular" />
          <p>Fazer Login</p>
        </button>
        <ProfileCard />      
      </div>
    </aside>
  )
}

export default Sidebar
