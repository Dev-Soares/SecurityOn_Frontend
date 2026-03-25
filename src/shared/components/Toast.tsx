import toast, { Toaster } from 'react-hot-toast'
import { CheckCircle, WarningCircle, X } from '@phosphor-icons/react'

export const showSuccess = (message: string) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } flex items-center gap-3 px-4 py-3 rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/30 shadow-lg max-w-sm w-full`}
    >
      <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
        <CheckCircle size={20} weight="bold" className="text-blue-500 dark:text-blue-400" />
      </div>
      <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 flex-1">{message}</p>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="p-1 rounded-lg cursor-pointer text-blue-400 dark:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors duration-200"
      >
        <X size={14} weight="bold" />
      </button>
    </div>
  ))
}

export const showError = (message: string) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } flex items-center gap-3 px-4 py-3 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30 shadow-lg max-w-sm w-full`}
    >
      <div className="shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
        <WarningCircle size={20} weight="bold" className="text-red-500 dark:text-red-400" />
      </div>
      <p className="text-sm font-semibold text-red-800 dark:text-red-300 flex-1">{message}</p>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="p-1 rounded-lg cursor-pointer text-red-400 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors duration-200"
      >
        <X size={14} weight="bold" />
      </button>
    </div>
  ))
}

export const AppToaster = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 4000,
    }}
  />
)
