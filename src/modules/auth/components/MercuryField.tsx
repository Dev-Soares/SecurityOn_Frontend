import React, { useState, forwardRef } from 'react'
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'

type MercuryFieldProps = {
    label: string
    error?: string
    password?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

// Campo de linha da tela de entrada: rótulo pequeno em caixa alta, linha fina
// que acende em ciano no foco. O glow é irmão do input e cresce com :focus-within.
const MercuryField = forwardRef<HTMLInputElement, MercuryFieldProps>(
    ({ label, error, password, id, type = 'text', ...rest }, ref) => {

        const [revealed, setRevealed] = useState(false)

        const fieldId = id ?? rest.name
        const inputType = password ? (revealed ? 'text' : 'password') : type

        return (
            <div className='mercury-field'>
                <label className='mercury-label' htmlFor={fieldId}>
                    {label}
                </label>

                <div className='mercury-line'>
                    <input
                        ref={ref}
                        id={fieldId}
                        type={inputType}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={error ? `${fieldId}-error` : undefined}
                        style={password ? { paddingRight: '2.5rem' } : undefined}
                        {...rest}
                    />

                    {password && (
                        <button
                            type='button'
                            className='mercury-reveal'
                            onClick={() => setRevealed((current) => !current)}
                            aria-label={revealed ? 'Ocultar senha' : 'Mostrar senha'}
                            aria-pressed={revealed}
                        >
                            {revealed ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
                        </button>
                    )}

                    <div className='mercury-glow' />
                </div>

                {error && (
                    <p id={`${fieldId}-error`} className='mercury-error'>
                        {error}
                    </p>
                )}
            </div>
        )
    },
)

export default MercuryField
