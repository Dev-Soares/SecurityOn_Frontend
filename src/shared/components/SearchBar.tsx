import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

const SearchBar: React.FC = () => {

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    
    <div className={` p-2 px-5 bg-gray-300 dark:bg-gray-900 rounded-md h-12 md:h-15 md:w-[82%] lg:w-[84%] xl:w-[65%] w-[95%] flex items-center gap-2 transition-all duration-300 ${isFocused ? 'ring-2 ring-blue-500 bg-gray-200 dark:bg-gray-700' : ''}`}>
      <input 
        type="text" 
        placeholder="Search..." 
        className='w-full h-full bg-transparent outline-none font-medium text-gray-950 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <MagnifyingGlassIcon size={32} weight="regular" className={`transition-colors duration-300 ${isFocused ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`} />
    </div>
  )
}

export default SearchBar;
