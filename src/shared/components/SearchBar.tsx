import React, { useState } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'

const SearchBar: React.FC = () => {

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className={`w-full max-w-2xl px-4 py-3 flex items-center gap-3 border-b transition-all duration-200 ${isFocused ? 'border-blue-500' : 'border-gray-300 dark:border-gray-700'}`}>
      <MagnifyingGlass size={20} weight="bold" className={`shrink-0 transition-colors duration-200 ${isFocused ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} />
      <input
        type="text"
        placeholder="Pesquisar..."
        className='w-full bg-transparent outline-none text-sm lg:text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  )
}

export default SearchBar;
