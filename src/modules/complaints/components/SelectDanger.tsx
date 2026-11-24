import React, { useState, useRef, useEffect } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import { dangerConfig, dangerLevels } from '../config/dangerConfig'
import type { DangerType } from '../config/dangerConfig'

interface SelectDangerProps {
    value: DangerType | false
    onChange: (value: DangerType) => void
    required?: boolean
}

// Rótulo, descrição e cor vêm do dangerConfig, mesma fonte que o card do feed usa.
const dangerOptions = dangerLevels.map((value) => ({
    value: value,
    label: dangerConfig[value].label,
    description: dangerConfig[value].description,
    dotColor: dangerConfig[value].dot,
}))

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
                className="w-full p-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 cursor-pointer flex items-center justify-between transition-all duration-200 text-sm lg:text-base"
            >
                {selectedOption ? (
                    <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${selectedOption.dotColor}`} />
                        <span className="font-medium text-gray-900 dark:text-white text-sm lg:text-base">{selectedOption.label}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{selectedOption.description}</span>
                    </div>
                ) : (
                    <span className="text-gray-400 dark:text-gray-500">Selecione o nível de perigo</span>
                )}
                <CaretDown
                    size={18}
                    weight="bold"
                    className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg">
                    {dangerOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelect(option)}
                            className={`w-full p-3 flex items-center gap-2.5 transition-colors duration-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                                value === option.value ? 'bg-gray-50 dark:bg-gray-800/50' : ''
                            }`}
                        >
                            <span className={`w-2 h-2 rounded-full shrink-0 ${option.dotColor}`} />
                            <span className="font-medium text-gray-900 dark:text-white text-sm">{option.label}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{option.description}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SelectDanger
