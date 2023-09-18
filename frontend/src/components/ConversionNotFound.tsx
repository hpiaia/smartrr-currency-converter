import notFound from '@/assets/not-found.svg'

export default function ConversionNotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <img src={notFound} alt="Select a conversion" className="w-96" />

      <div className="mt-16 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Conversion not found</h1>

        <p className="mt-2 text-sm text-slate-500">
          Looks like this conversion doesn't exist. Try selecting another one from the sidebar.
        </p>
      </div>
    </div>
  )
}
