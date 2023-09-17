function Card() {
  return (
    <div className="rounded-lg border-2 border-white bg-white p-6">
      <div className="flex space-x-2">
        <div className="h-[16px] w-[24px] animate-pulse rounded bg-slate-100" />
        <div className="h-[16px] w-[24px] animate-pulse rounded bg-slate-100" />
      </div>

      <div className="mt-2 h-[24px] animate-pulse rounded bg-slate-100" />
      <div className="mt-2 h-[36px] animate-pulse rounded bg-slate-100" />
      <div className="mt-2 h-[16px] animate-pulse rounded bg-slate-100" />
    </div>
  )
}

export default function ConversionCardSkeleton() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-6">
      <Card />
      <Card />
    </div>
  )
}
