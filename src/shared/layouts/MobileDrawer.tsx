import { useEffect, type FunctionComponent } from "react"
import { useLocation } from "react-router-dom"
import { UsersThree, Article, Flag, Handshake, ShieldCheck, User, SignIn, Sun, Moon, X } from "@phosphor-icons/react"
import useNavigateTo from "../hooks/useNavigateTo"
import LogoIcon from "@/shared/components/LogoIcon"
import { useTheme } from "@/shared/contexts/themeContext"
import { useUser } from "../contexts/userContext"
import { usePendingRequestsBadge } from "@/modules/friendship/hooks/usePendingRequestsBadge"
import CountBadge from "@/shared/components/CountBadge"

type DrawerItemProps = {
  text: string
  route: string
  isSelected: boolean
  iconOutline: React.ReactNode
  iconFilled: React.ReactNode
  badge?: string | null
  onNavigate: (route: string) => void
}

const DrawerItem: FunctionComponent<DrawerItemProps> = ({ text, route, isSelected, iconOutline, iconFilled, badge, onNavigate }) => (
  <button
    onClick={() => onNavigate(route)}
    className={`w-full p-3 px-4 flex items-center gap-4 rounded-full text-lg cursor-pointer transition-all duration-200
      ${isSelected
        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold'
        : 'text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800/60'
      }`}
  >
    {isSelected ? iconFilled : iconOutline}
    <span>{text}</span>
    <CountBadge value={badge} className='ml-auto' />
  </button>
)

type MobileDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const MobileDrawer: FunctionComponent<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const navigateTo = useNavigateTo()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { user, isLogged } = useUser()
  const pendingRequests = usePendingRequestsBadge()

  const profileRoute = isLogged ? `/profile/${user?.id}` : '/login'

  // Trava o scroll do body enquanto o drawer estiver aberto.
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [isOpen])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const handleNavigate = (route: string) => {
    navigateTo(route)
    onClose()
  }

  return (
    <div className={`lg:hidden fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>

      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Painel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={`absolute left-0 top-0 h-full w-[80%] max-w-80 flex flex-col bg-white dark:bg-gray-950 shadow-xl
          transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Topo */}
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center gap-1">
            <LogoIcon size={40} />
            <span className="text-lg font-bold tracking-tight text-blue-600 dark:text-white">SecurityOn</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
          >
            <X size={22} weight="bold" />
          </button>
        </div>

        {/* Perfil */}
        <button
          onClick={() => handleNavigate(profileRoute)}
          className="flex items-center gap-3 px-4 py-4 mt-2 text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
        >
          <img
            src={user?.avatarUrl ? user.avatarUrl : '/avatar.png'}
            alt={`${user?.name ?? 'User'} avatar`}
            className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-700 shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-gray-900 dark:text-white truncate">{user ? user.name : 'Convidado'}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
              @{user ? user.name.toLowerCase().replace(/\s+/g, '') : 'convidado'}
            </span>
          </div>
        </button>

        {/* Navegação */}
        <nav className="flex flex-col gap-1 px-2 mt-2 overflow-y-auto">
          <DrawerItem text="Comunidade" route="/community" iconOutline={<UsersThree size={26} weight="regular" />} iconFilled={<UsersThree size={26} weight="fill" />} isSelected={location.pathname === '/community'} onNavigate={handleNavigate} />
          <DrawerItem text="Artigos" route="/articles" iconOutline={<Article size={26} weight="regular" />} iconFilled={<Article size={26} weight="fill" />} isSelected={location.pathname === '/articles'} onNavigate={handleNavigate} />
          <DrawerItem text="Denúncias" route="/complaint" iconOutline={<Flag size={26} weight="regular" />} iconFilled={<Flag size={26} weight="fill" />} isSelected={location.pathname === '/complaint'} onNavigate={handleNavigate} />
          <DrawerItem text="Verificar site" route="/check-site" iconOutline={<ShieldCheck size={26} weight="regular" />} iconFilled={<ShieldCheck size={26} weight="fill" />} isSelected={location.pathname === '/check-site'} onNavigate={handleNavigate} />
          <DrawerItem text="Amigos" route="/friends" iconOutline={<Handshake size={26} weight="regular" />} iconFilled={<Handshake size={26} weight="fill" />} isSelected={location.pathname === '/friends'} badge={pendingRequests} onNavigate={handleNavigate} />
          {isLogged && (
            <DrawerItem text="Perfil" route={profileRoute} iconOutline={<User size={26} weight="regular" />} iconFilled={<User size={26} weight="fill" />} isSelected={location.pathname === profileRoute} onNavigate={handleNavigate} />
          )}
        </nav>

        {/* Rodapé */}
        <div className="mt-auto flex flex-col gap-3 px-4 py-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="
              flex items-center gap-2.5 w-full px-2 py-2 rounded-xl cursor-pointer
              text-gray-500 dark:text-gray-400
              hover:text-gray-700 dark:hover:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-800/50
              transition-all duration-200 text-sm font-medium
            "
          >
            {theme === 'dark' ? (
              <Moon size={18} weight="bold" />
            ) : (
              <Sun size={18} weight="bold" className="text-amber-400" />
            )}
            <span>{theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}</span>
          </button>

          {!isLogged && (
            <button
              onClick={() => handleNavigate('/login')}
              className="flex justify-center items-center gap-3 w-full py-3 text-white bg-blue-500 hover:bg-blue-600 active:scale-[0.98] transition-all duration-200 rounded-full text-base font-bold cursor-pointer shadow-sm hover:shadow-md"
            >
              <SignIn size={22} weight="bold" />
              <span>Entrar</span>
            </button>
          )}
        </div>
      </aside>
    </div>
  )
}

export default MobileDrawer
