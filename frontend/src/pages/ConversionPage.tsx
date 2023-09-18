import { ArrowRightLeftIcon } from 'lucide-react'
import CurrencyFlag from 'react-currency-flags'
import { useParams } from 'react-router-dom'

import ConversionPageSkeleton from '@/components/ConversionPageSkeleton'
import ConversionStats from '@/components/ConversionStats'
import RatesFeed from '@/components/RatesFeed'
import { currencies } from '@/lib/currencies'
import { useGetConversionQuery, useRateAddedSubscription } from '@/lib/gql'
import { ConversionNotFound } from '@/components/ConversionNotFound'

export default function ConversionPage() {
  const params = useParams()

  const [{ data, fetching }, refetch] = useGetConversionQuery({
    variables: {
      id: Number(params.conversionId),
    },
  })

  useRateAddedSubscription(
    {
      variables: { conversionId: Number(params.conversionId) },
    },
    () => {
      refetch({ requestPolicy: 'network-only' })
    },
  )

  if (fetching) return <ConversionPageSkeleton />
  if (!data) return <ConversionNotFound />

  return (
    <div>
      <div className="grid grid-cols-3">
        <div className="text-left">
          <div className="flex items-center justify-start space-x-4">
            <CurrencyFlag currency={data.conversion.from} size="md" />
            <div className="text-3xl font-semibold text-slate-900">{data.conversion.from}</div>
          </div>

          <div>{currencies[data.conversion.from]}</div>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRightLeftIcon className="text-primary-200 h-6 w-6" />
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end space-x-4">
            <div className="text-3xl font-semibold text-slate-900">{data.conversion.to}</div>
            <CurrencyFlag currency={data.conversion.to} size="md" />
          </div>

          <div>{currencies[data.conversion.to]}</div>
        </div>
      </div>

      <ConversionStats from={data.conversion.from} to={data.conversion.to} rates={data.conversion.rates} />

      <div className="mt-12">
        <RatesFeed rates={data.conversion.rates} />
      </div>
    </div>
  )
}
