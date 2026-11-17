import React, { useState } from 'react'
import { MagnifyingGlass, X } from '@phosphor-icons/react'

interface SearchBarProps {
  // Controlado quando a página precisa do termo (filtro de artigos);
  // sem as props segue funcionando como campo solto.
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Pesquisar...' }) => {

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [internalTerm, setInternalTerm] = useState<string>('');

  const searchTerm = value ?? internalTerm

  const handleChange = (term: string) => {
    if (onChange) onChange(term)
    else setInternalTerm(term)
  }

  return (
    <div className={`w-full px-2 sm:px-4 py-3 flex items-center gap-3 border-b transition-all duration-200 ${isFocused ? 'border-blue-500' : 'border-gray-300 dark:border-gray-700'}`}>
      <MagnifyingGlass size={20} weight="bold" className={`shrink-0 transition-colors duration-200 ${isFocused ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} />
      <input
        type="text"
        placeholder={placeholder}
        className='w-full bg-transparent outline-none text-sm lg:text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500'
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {searchTerm && (
        <button
          onClick={() => handleChange('')}
          aria-label='Limpar busca'
          className='shrink-0 p-1 rounded-full cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200'
        >
          <X size={16} weight="bold" />
        </button>
      )}
    </div>
  )
}

export default SearchBar;
