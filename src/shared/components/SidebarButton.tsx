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
    className=
    {`w-full h-auto p-3 text-blue-500 dark:text-white hover:bg-gray-300 hover:dark:bg-gray-800 hover:translate-y-[-2px] transition-all duration-300 flex justify-start items-center gap-3 rounded-md text-xl xl:text-2xl cursor-pointer`}>
        {isSelected ? iconFilled : iconOutline}
        <p className={isSelected ? 'font-semibold' : 'font-normal'}>{text}</p>
    </button>
  )
}

export default SidebarButton
