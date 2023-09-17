import { groupBy } from 'lodash'
import { MoveRightIcon, RepeatIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { useMemo } from 'react'

import { formatCurrency, formatPercent } from '@/utils'

type Rate = {
  id: number
  amount: number
  date: string
}

type Props = {
  rates: Rate[]
}

function RateRow({ rate, previous }: { rate: Rate; previous?: Rate }) {
  const change = useMemo(() => {
    if (previous) {
      return ((rate.amount - previous.amount) / previous.amount) * 100
    }
    return 0
  }, [rate, previous])

  return (
    <tr key={rate.id} className="even:bg-slate-50">
      <td className="pl-4">
        {change > 0 && <TrendingUpIcon className="h-5 w-5 text-green-300" />}
        {change === 0 && <MoveRightIcon className="text-primary-300 h-5 w-5" />}
        {change < 0 && <TrendingDownIcon className="h-5 w-5 text-red-300" />}
      </td>

      <td className="whitespace-nowrap py-2 text-right text-sm text-slate-500">{formatPercent(change)} %</td>

      <td className="whitespace-nowrap px-2 py-2 text-right text-sm font-medium text-slate-900">
        {formatCurrency(rate.amount)}
      </td>

      <td className="whitespace-nowrap py-2 pr-4 text-right text-sm text-slate-400">
        <time dateTime={rate.date}>{new Date(rate.date).toLocaleTimeString()}</time>
      </td>
    </tr>
  )
}

export default function RatesFeed({ rates }: Props) {
  const grouped = useMemo(() => groupBy(rates, (rate) => new Date(rate.date).toDateString()), [rates])

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-slate-900">Latest activity</h1>
          <p className="mt-2 text-sm text-slate-700">All rates for this conversion, most recent first.</p>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {rates.length === 0 && (
              <div className="text-center">
                <RepeatIcon className="mx-auto h-8 w-8 text-slate-300" />
                <h3 className="mt-4 text-sm font-medium text-slate-900">No rates yet</h3>
                <p className="mt-1 text-sm text-slate-500">Rates will appear here as they are added.</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-12">
              {Object.entries(grouped).map(([date, groupedRates]) => (
                <div>
                  <h3 className="text-base font-semibold leading-6 text-slate-900">{date}</h3>
                  {groupedRates.length > 0 && (
                    <table className="mt-2 min-w-full divide-y divide-slate-300">
                      <thead>
                        <tr>
                          <th className="w-6" />
                          <th className="w-24" />
                          <th className="w-32" />
                          <th />
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-200 bg-white">
                        {groupedRates.map((rate, index) => (
                          <RateRow key={rate.id} rate={rate} previous={rates[index + 1]} />
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
