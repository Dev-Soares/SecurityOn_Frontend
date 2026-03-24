import type { FunctionComponent } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import SidebarButton from "@/shared/components/SidebarButton"
import ProfileCard from "@/shared/components/ProfileCard"
import { UsersThree, Article, Flag, SignIn, Sun, Moon } from "@phosphor-icons/react"
import LogoIcon from "@/shared/components/LogoIcon"
import { useTheme } from "@/shared/contexts/themeContext"


const Sidebar: FunctionComponent = () => {

  const navigateTo = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (

    <aside className='hidden lg:flex sticky top-0 h-screen w-[32%] min-w-64 max-w-80 shrink-0 px-6 py-8 bg-white dark:bg-gray-950 dark:border-gray-800 border-r border-gray-100 overflow-hidden self-start justify-between flex-col'>

      {/* Logo */}
      <div className="flex items-center gap-1 px-2">
        <LogoIcon size={56}/>
        <h1 className="text-xl font-bold tracking-tight text-blue-600 dark:text-white">SecurityOn</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 -mx-2 mt-16 mb-auto ">
        <SidebarButton text="Comunidade" route="/community" iconOutline={<UsersThree size={28} weight="regular" />} iconFilled={<UsersThree size={28} weight="fill" />} isSelected={location.pathname === '/community'} />
        <SidebarButton text="Artigos" route="/articles" iconOutline={<Article size={28} weight="regular" />} iconFilled={<Article size={28} weight="fill" />} isSelected={location.pathname === '/articles'} />
        <SidebarButton text="Denúncias" route="/complaint" iconOutline={<Flag size={28} weight="regular" />} iconFilled={<Flag size={28} weight="fill" />} isSelected={location.pathname === '/complaint'} />
      </nav>

      {/* Bottom section */}
      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={toggleTheme}
          aria-label="Alternar tema"
          className="
            flex items-center gap-2.5
            w-full px-4 py-2 rounded-xl cursor-pointer
            text-gray-500 dark:text-gray-400
            hover:text-gray-700 dark:hover:text-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-800/50
            transition-all duration-200
            text-sm font-medium
          "
        >
          {theme === 'dark' ? (
            <Moon size={18} weight="bold" />
          ) : (
            <Sun size={18} weight="bold" className="text-amber-400" />
          )}
          <span>{theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}</span>
        </button>
        <button onClick={() => navigateTo('/login')}
        className="flex justify-center items-center gap-3 w-full py-3.5 text-white bg-blue-500 hover:bg-blue-600 active:scale-[0.98] transition-all duration-200 rounded-full text-lg font-bold cursor-pointer shadow-sm hover:shadow-md">
          <SignIn size={24} weight="bold" />
          <span>Entrar</span>
        </button>
        <ProfileCard />
      </div>
    </aside>
  )
}

export default Sidebar
