import { type ClassValue, clsx } from 'clsx'
import currency from 'currency.js'
import { formatDistanceToNow } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function formatCurrency(amount: number) {
  return currency(amount, { precision: 4, symbol: '' }).format()
}

export function formatPercent(amount: number) {
  return Intl.NumberFormat('en-US', { signDisplay: 'exceptZero', maximumFractionDigits: 2 }).format(amount)
}
