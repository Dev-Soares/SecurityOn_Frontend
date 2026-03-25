import toast, { Toaster } from 'react-hot-toast'
import { CheckCircle, WarningCircle, X } from '@phosphor-icons/react'

export const showSuccess = (message: string) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-toast-in' : 'animate-toast-out'
      } flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-green-200 dark:border-green-800 bg-white dark:bg-gray-900 shadow-lg max-w-sm w-full`}
    >
      <div className="shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
        <CheckCircle size={20} weight="bold" className="text-green-500 dark:text-green-400" />
      </div>
      <p className="text-sm font-semibold text-green-800 dark:text-green-300 flex-1">{message}</p>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="p-1 rounded-lg cursor-pointer text-green-400 dark:text-green-500 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors duration-200"
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
        t.visible ? 'animate-toast-in' : 'animate-toast-out'
      } flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-red-200 dark:border-red-800 bg-white dark:bg-gray-900 shadow-lg max-w-sm w-full`}
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
