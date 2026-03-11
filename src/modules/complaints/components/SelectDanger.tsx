import React, { useState, useRef, useEffect } from 'react'
import { CaretDown, Warning, Shield, Fire } from '@phosphor-icons/react'

type DangerType = 'aviso' | 'cuidado' | 'perigo' | 'critico'

interface SelectDangerProps {
    value: DangerType | false
    onChange: (value: DangerType) => void
    required?: boolean
}

const dangerOptions = [
    {
        value: 'aviso' as DangerType,
        label: 'Aviso',
        description: 'Requer atenção',
        color: 'text-yellow-600 dark:text-yellow-500',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        hoverBg: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
        icon: Warning
    },
    {
        value: 'cuidado' as DangerType,
        label: 'Cuidado',
        description: 'Risco moderado',
        color: 'text-orange-600 dark:text-orange-500',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        hoverBg: 'hover:bg-orange-50 dark:hover:bg-orange-900/20',
        icon: Shield
    },
    {
        value: 'perigo' as DangerType,
        label: 'Perigo',
        description: 'Risco alto',
        color: 'text-red-600 dark:text-red-500',
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        hoverBg: 'hover:bg-red-50 dark:hover:bg-red-900/20',
        icon: Fire
    },
    
]

const SelectDanger: React.FC<SelectDangerProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)

    const selectedOption = dangerOptions.find(opt => opt.value === value)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = (option: typeof dangerOptions[0]) => {
        onChange(option.value)
        setIsOpen(false)
    }

    return (
        <div ref={selectRef} className="relative w-full">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-950 dark:text-white border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 cursor-pointer flex items-center justify-between transition-colors"
            >
                {selectedOption ? (
                    <div className="flex items-center gap-3">
                        <div className={`${selectedOption.bgColor} p-2 rounded-lg`}>
                            <selectedOption.icon size={20} weight="fill" className={selectedOption.color} />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="font-semibold">{selectedOption.label}</span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{selectedOption.description}</span>
                        </div>
                    </div>
                ) : (
                    <span className="text-gray-500 dark:text-gray-400">Selecione o nível de perigo</span>
                )}
                <CaretDown 
                    size={20} 
                    weight="bold" 
                    className={`text-gray-600 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-xl overflow-hidden">
                    {dangerOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelect(option)}
                            className={`w-full p-4 flex items-center gap-3 transition-colors ${option.hoverBg} ${
                                value === option.value ? option.bgColor : ''
                            }`}
                        >
                            <div className={`${option.bgColor} p-2 rounded-lg`}>
                                <option.icon size={20} weight="fill" className={option.color} />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="font-semibold text-gray-900 dark:text-white">{option.label}</span>
                                <span className="text-xs text-gray-600 dark:text-gray-400">{option.description}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SelectDanger
