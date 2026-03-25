import React, { useState, forwardRef } from 'react'
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'

type InputProps = {
    placeholder?: string;
    type?: string;
    password?:boolean
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder, type = "text", password, ...rest }, ref) => {

  const [showPassword, setShowPassword] = useState(false);

  const inputType = password ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      <input type={inputType}
     ref={ref}
     maxLength={password ? 16 : 60}
     placeholder={placeholder}
     className='w-full p-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm lg:text-base'
     {...rest}
     />
     {
        password && (
        <button type="button" className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer'
        onClick={() => setShowPassword((prev) => !prev)}
        tabIndex={-1}
        >
            {showPassword ? <EyeSlashIcon size={20} weight="regular" /> : <EyeIcon size={20} weight="regular" />}
        </button>
        )
     }

     </div>
  )
})

export default Input
