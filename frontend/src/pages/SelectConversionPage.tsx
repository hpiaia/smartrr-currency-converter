import select from '@/assets/select.svg'

export function SelectConversionPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <img src={select} alt="Select a conversion" className="w-96" />

      <div className="mt-16 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Select a conversion</h1>

        <p className="mt-2 text-sm text-slate-500">
          Select a conversion from the list on the left to see its stats and rates.
        </p>
      </div>
    </div>
  )
}
