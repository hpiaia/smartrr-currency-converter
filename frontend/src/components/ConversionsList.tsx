import { useAllConversionsQuery, useRateAddedSubscription } from '@/lib/gql'

import ConversionCard from './ConversionCard'
import ConversionCardSkeleton from './ConversionCardSkeleton'

export default function ConversionsList() {
  const [{ data, fetching }, refetch] = useAllConversionsQuery()

  useRateAddedSubscription({}, () => {
    refetch({ requestPolicy: 'network-only' })
  })

  if (!data && fetching) return <ConversionCardSkeleton />
  if (!data) return null

  return (
    <div className="mt-12 grid grid-cols-2 gap-6">
      {data.conversions.map((conversion) => (
        <ConversionCard
          key={conversion.id}
          id={conversion.id}
          from={conversion.from}
          to={conversion.to}
          latestAmount={conversion.latestRate?.amount}
          updatedAt={conversion.latestRate?.date}
        />
      ))}
    </div>
  )
}
