import React from 'react'
import type { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'

type SidebarButtonProps = {
    text: string;
    route: string;
    isSelected: boolean;
    iconOutline: React.ReactNode;
    iconFilled: React.ReactNode;
}

const SidebarButton: FunctionComponent<SidebarButtonProps> = ({ text, iconOutline, iconFilled, isSelected, route}) => {

  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(route)}
    className={`w-full p-3 px-4 flex items-center gap-4 rounded-full text-xl cursor-pointer transition-all duration-200
      ${isSelected
        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold'
        : 'text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800/60'
      }`}>
        {isSelected ? iconFilled : iconOutline}
        <span>{text}</span>
    </button>
  )
}

export default SidebarButton
