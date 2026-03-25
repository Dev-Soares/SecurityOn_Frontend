import type { FunctionComponent } from "react"
import { UsersThree, Article, Flag } from "@phosphor-icons/react"
import { useLocation } from "react-router-dom"
import useNavigateTo from "../hooks/useNavigateTo"

type NavItemProps = {
  icon: (active: boolean) => React.ReactNode
  route: string
  label: string
}

const NavItem: FunctionComponent<NavItemProps> = ({ icon, route, label }) => {
  const navigateTo = useNavigateTo();
  const location = useLocation();
  const isActive = location.pathname === route;

  return (
    <button
      onClick={() => navigateTo(route)}
      className={`
        relative flex flex-1 flex-col items-center justify-center gap-1 py-2 cursor-pointer
        transition-all duration-200
        ${isActive
          ? "text-gray-900 dark:text-white font-bold"
          : "text-gray-500 dark:text-gray-400 font-medium"
        }
      `}
    >
      <span
        className={`
          absolute left-0 -top-2.5 h-[3px] rounded-full bg-gray-900 dark:bg-white
          transition-all duration-300
          ${isActive ? "w-full" : "w-0"}
        `}
      />
      {icon(isActive)}
      <span className="text-xs">{label}</span>
    </button>
  )
}

const BottomNav: FunctionComponent = () => {
  return (
    <nav
      className="lg:hidden fixed left-0 right-0 bottom-0 z-50 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex justify-around items-center px-2 py-2"
      style={{ paddingBottom: 'calc(8px + env(safe-area-inset-bottom))' }}
    >
      <NavItem
        icon={active => (
          <UsersThree size={26} weight={active ? "fill" : "regular"} />
        )}
        route="/community"
        label="Comunidade"
      />
      <NavItem
        icon={active => (
          <Article size={26} weight={active ? "fill" : "regular"} />
        )}
        route="/articles"
        label="Artigos"
      />
      <NavItem
        icon={active => (
          <Flag size={26} weight={active ? "fill" : "regular"} />
        )}
        route="/complaint"
        label="Denúncias"
      />
    </nav>
  )
}

export default BottomNav
