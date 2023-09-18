import { maxBy, minBy } from 'lodash'
import { useMemo } from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'

import { formatCurrency } from '@/utils'

type Props = {
  from: string
  to: string
  rates: {
    amount: number
    date: string
  }[]
}
export default function ConversionStats({ rates }: Props) {
  const latest = useMemo(() => rates[0], [rates])
  const min = useMemo(() => minBy(rates, 'amount'), [rates])
  const max = useMemo(() => maxBy(rates, 'amount'), [rates])

  return (
    <dl className="mt-8 grid grid-cols-4 gap-0.5 overflow-hidden rounded-2xl text-center">
      <div className="flex flex-col bg-slate-50 p-8">
        <dt className="text-sm font-semibold leading-6 text-slate-600">Latest</dt>
        <dd className="order-first text-3xl font-semibold tracking-tight text-slate-900">
          {latest ? formatCurrency(latest.amount) : '---'}
        </dd>
      </div>

      <div className="flex flex-col bg-slate-50 p-8">
        <dt className="text-sm font-semibold leading-6 text-slate-600">Min</dt>
        <dd className="order-first text-3xl font-semibold tracking-tight text-slate-900">
          {min ? formatCurrency(min.amount) : '---'}
        </dd>
      </div>

      <div className="flex flex-col bg-slate-50 p-8">
        <dt className="text-sm font-semibold leading-6 text-slate-600">Max</dt>
        <dd className="order-first text-3xl font-semibold tracking-tight text-slate-900">
          {max ? formatCurrency(max.amount) : '---'}
        </dd>
      </div>

      <div className="flex flex-col justify-center bg-slate-50 p-8">
        {rates.length < 3 ? (
          <dt className="text-sm font-semibold leading-6 text-slate-600">Not enough data</dt>
        ) : (
          <Sparklines data={rates.map((rate) => rate.amount).reverse()} height={60} style={{ height: 60 }}>
            <SparklinesLine color="blue" />
          </Sparklines>
        )}
      </div>
    </dl>
  )
}
