import { ArrowRight } from 'lucide-react'
import CurrencyFlag from 'react-currency-flags'
import { Link, useParams } from 'react-router-dom'

import { cn, formatCurrency } from '@/utils'

import TimeAgo from './TimeAgo'

type Props = {
  id: number
  from: string
  to: string
  latestAmount?: number
  updatedAt?: string
}

export default function ConversionCard({ id, from, to, latestAmount, updatedAt }: Props) {
  const isActive = Number(useParams().conversionId) === id

  return (
    <Link
      to={`/${id}`}
      className={cn('rounded-lg border-2 border-white bg-white p-6', {
        'border-primary-600 border-2 shadow-lg': isActive,
        'hover:shadow-lg': !isActive,
      })}
    >
      <div className="space-x-2">
        <CurrencyFlag currency={from} />
        <CurrencyFlag currency={to} />
      </div>

      <div className="mt-1 flex items-center space-x-2 text-slate-500">
        <span>{from}</span>
        <ArrowRight className="w-4" />
        <span>{to}</span>
      </div>

      <div className="mt-1 w-full flex-none text-3xl font-medium leading-10 tracking-tight text-slate-900">
        {latestAmount ? formatCurrency(latestAmount) : '---'}
      </div>
      <div className="text-sm text-slate-400">{updatedAt ? <TimeAgo date={updatedAt} /> : 'not updated yet'}</div>
    </Link>
  )
}
