import { useEffect, useState } from 'react'

import { formatTimeAgo } from '@/utils'

type Props = {
  date: string
}

export default function TimeAgo({ date }: Props) {
  const [timeAgo, setTimeAgo] = useState(() => formatTimeAgo(date))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgo(formatTimeAgo(date))
    }, 1000 * 60) // 10 seconds

    return () => clearInterval(intervalId)
  }, [date])

  return <span>{timeAgo}</span>
}
