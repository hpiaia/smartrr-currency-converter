import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

import { cn } from '@/utils'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

export default function Button({ loading = false, children, className, ...props }: Props) {
  return (
    <button
      className={cn(
        'bg-primary-600 focus-visible:outline-primary-600 enabled:hover:bg-primary-700 flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50',
        className,
      )}
      disabled={loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

      {children}
    </button>
  )
}
