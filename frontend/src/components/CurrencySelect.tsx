import { Combobox } from '@headlessui/react'
import { ChevronsUpDownIcon } from 'lucide-react'
import { useState } from 'react'
import CurrencyFlag from 'react-currency-flags'

import { currencies } from '@/lib/currencies'
import { cn } from '@/utils'

type Props = {
  label: string
  error?: string
  required?: boolean
  onChange: (value: string) => void
}

const currencyList = Object.entries(currencies).map(([code, name]) => ({ code, name }))

export default function CurrencySelect({ label, error, required, onChange }: Props) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string>('')

  const filtered =
    query === ''
      ? currencyList
      : currencyList.filter((currency) => {
          return (
            currency.name.toLowerCase().includes(query.toLowerCase()) ||
            currency.code.toLowerCase().includes(query.toLowerCase())
          )
        })

  return (
    <Combobox
      as="div"
      value={selected}
      onChange={(e) => {
        setSelected(e)
        onChange(e)
      }}
    >
      <Combobox.Label className="block text-sm font-medium leading-6 text-slate-900">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </Combobox.Label>

      <div className="relative mt-2">
        <Combobox.Input
          className="focus:ring-primary-600 w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(code: string) => currencies[code]}
        />

        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronsUpDownIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
        </Combobox.Button>

        {filtered.length > 0 && (
          <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filtered.map((currency) => (
              <Combobox.Option
                key={currency.code}
                value={currency.code}
                className={({ active }) =>
                  cn(
                    'relative cursor-default select-none px-3 py-2',
                    active ? 'bg-primary-600 text-white' : 'text-slate-900',
                  )
                }
              >
                {({ selected, active }) => (
                  <div className="flex items-center space-x-4">
                    <CurrencyFlag currency={currency.code} size="sm" />
                    <span className={cn('block flex-1 truncate', selected && 'font-semibold')}>{currency.name}</span>
                    <span
                      className={cn('font-semibold', {
                        'text-slate-400': !active,
                        'text-white': active,
                      })}
                    >
                      {currency.code}
                    </span>
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </Combobox>
  )
}
