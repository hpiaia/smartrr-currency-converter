import { ArrowRightLeftIcon } from 'lucide-react'

export default function ConversionPageSkeleton() {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <div className="mr-auto h-[36px] w-32 animate-pulse rounded bg-slate-100"></div>
          <div className="mr-auto mt-2 h-[16px] w-36 animate-pulse rounded bg-slate-100"></div>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRightLeftIcon className="text-primary-200 h-6 w-6" />
        </div>

        <div>
          <div className="ml-auto h-[36px] w-32 animate-pulse rounded bg-slate-100"></div>
          <div className="ml-auto mt-2 h-[16px] w-36 animate-pulse rounded bg-slate-100"></div>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-4 gap-0.5 overflow-hidden rounded-2xl text-center">
        <div className="flex flex-col bg-slate-50 p-8">
          <div className="mx-auto h-[58px] w-full animate-pulse rounded bg-slate-100" />
        </div>

        <div className="flex flex-col bg-slate-50 p-8">
          <div className="mx-auto h-[58px] w-full animate-pulse rounded bg-slate-100" />
        </div>

        <div className="flex flex-col bg-slate-50 p-8">
          <div className="mx-auto h-[58px] w-full animate-pulse rounded bg-slate-100" />
        </div>

        <div className="flex flex-col bg-slate-50 p-8">
          <div className="mx-auto h-[58px] w-full animate-pulse rounded bg-slate-100" />
        </div>
      </dl>

      <div className="mt-12">
        <div className="h-[24px] w-24 animate-pulse rounded bg-slate-100" />
        <div className="mt-2 h-[24px] w-72 animate-pulse rounded bg-slate-100" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-12">
        <div>
          {[...Array(13)].map((_, i) => (
            <div key={i} className="mt-3 h-[24px] w-full animate-pulse rounded bg-slate-100" />
          ))}
        </div>

        <div>
          {[...Array(13)].map((_, i) => (
            <div key={i} className="mt-3 h-[24px] w-full animate-pulse rounded bg-slate-100" />
          ))}
        </div>
      </div>
    </div>
  )
}
