import React from 'react'
import type { FunctionComponent } from 'react'
import useNavigateTo from '../hooks/useNavigateTo'

type SidebarButtonProps = {
    text: string;
    route: string;
    isSelected: boolean;
    iconOutline: React.ReactNode;
    iconFilled: React.ReactNode;
    // Contador opcional (ex.: pedidos de amizade pendentes).
    badge?: string | null;
}

const SidebarButton: FunctionComponent<SidebarButtonProps> = ({ text, iconOutline, iconFilled, isSelected, route, badge}) => {

  const navigateTo = useNavigateTo();

  return (
    <button onClick={() => navigateTo(route)}
    className={`w-full p-3 px-4 flex items-center gap-4 rounded-full text-xl cursor-pointer transition-all duration-200
      ${isSelected
        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold'
        : 'text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800/60'
      }`}>
        {isSelected ? iconFilled : iconOutline}
        <span>{text}</span>
        {badge && (
          <span className='ml-auto min-w-6 px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs font-bold text-center'>
            {badge}
          </span>
        )}
    </button>
  )
}

export default SidebarButton
