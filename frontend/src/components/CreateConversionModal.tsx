import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreateConversionMutation } from '@/lib/gql'

import Button from './Button'
import CurrencySelect from './CurrencySelect'
import Modal from './Modal'

type Props = {
  open: boolean
  onClose: () => void
}

const schema = z.object({
  from: z.string({ required_error: 'Please select a currency.' }),
  to: z.string({ required_error: 'Please select a currency.' }),
})

export default function CreateConversionModal({ open, onClose }: Props) {
  const [{ fetching }, createConversion] = useCreateConversionMutation()

  const { control, handleSubmit, formState } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  return (
    <Modal open={open} onClose={onClose}>
      <div className="mt-2 text-center text-xl font-medium">Create conversion</div>

      <form
        className="mt-6 flex h-full flex-col space-y-6"
        onSubmit={handleSubmit(async (data) => {
          await createConversion(data)
          onClose()
        })}
      >
        <Controller
          control={control}
          name="from"
          render={({ field: { onChange } }) => (
            <CurrencySelect
              label="From"
              onChange={onChange}
              error={formState.errors.from?.message?.toString()}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="to"
          render={({ field: { onChange } }) => (
            <CurrencySelect label="To" onChange={onChange} error={formState.errors.to?.message?.toString()} required />
          )}
        />

        <Button type="submit" loading={fetching} className="w-full">
          Create
        </Button>
      </form>
    </Modal>
  )
}
