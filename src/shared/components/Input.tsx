import React, { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'

type InputProps = {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    password?:boolean
};

const Input: React.FC<InputProps> = ({ value, onChange, placeholder, type = "text", password }) => {

  const [showPassword, setShowPassword] = useState(false);

  const inputType = password ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      <input type={inputType}
     value={value}
     maxLength={password ? 16 : 60}
     onChange={onChange}
     placeholder={placeholder}
     className='w-full p-3 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 transition-all duration-300 text-gray-950 dark:text-gray-100'
     />
     {
        password && (
        <button type="button" className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300'
        onClick={() => setShowPassword((prev) => !prev)}
        tabIndex={-1}
        >
            {showPassword ? <EyeSlashIcon size={24} weight="regular" className="text-blue-500 dark:text-white" /> : <EyeIcon size={24} weight="regular" className="text-blue-500 dark:text-white cursor-pointer" />}
        </button>
        )
     }
    
     </div>
  )
}

export default Input
