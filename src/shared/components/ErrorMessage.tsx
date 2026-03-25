import React from 'react'
import { WarningCircle, ArrowCounterClockwise, X } from '@phosphor-icons/react'

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
  onDismiss?: () => void
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Algo deu errado',
  message = 'Não foi possível carregar os dados. Tente novamente.',
  onRetry,
  onDismiss,
}) => {
  return (
    <div className="w-full flex items-center gap-4 p-4 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30">
      <div className="shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
        <WarningCircle size={22} weight="bold" className="text-red-500 dark:text-red-400" />
      </div>

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="text-sm font-bold text-red-800 dark:text-red-300">{title}</p>
        <p className="text-sm text-red-600 dark:text-red-400/80 leading-relaxed">{message}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {onRetry && (
          <button
            onClick={onRetry}
            className="
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg
              text-xs font-semibold cursor-pointer
              bg-red-100 dark:bg-red-900/40
              text-red-600 dark:text-red-300
              hover:bg-red-200 dark:hover:bg-red-900/60
              active:scale-[0.98]
              transition-all duration-200
            "
          >
            <ArrowCounterClockwise size={14} weight="bold" />
            <span>Tentar novamente</span>
          </button>
        )}

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="
              p-1.5 rounded-lg cursor-pointer
              text-red-400 dark:text-red-500
              hover:bg-red-100 dark:hover:bg-red-900/40
              transition-colors duration-200
            "
            aria-label="Fechar"
          >
            <X size={16} weight="bold" />
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
