import React from 'react'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-[3px]',
  lg: 'w-12 h-12 border-4',
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  return (
    <div
      className={`${sizeMap[size]} rounded-full border-blue-200 dark:border-blue-900 border-t-blue-500 dark:border-t-blue-400 animate-spin ${className}`}
      role="status"
      aria-label="Carregando"
    />
  )
}

export default Spinner
