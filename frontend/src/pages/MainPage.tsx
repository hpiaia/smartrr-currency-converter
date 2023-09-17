import { GithubIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import Button from '@/components/Button'
import ConversionsList from '@/components/ConversionsList'
import CreateConversionModal from '@/components/CreateConversionModal'
import Logo from '@/components/Logo'

export default function MainPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false)

  return (
    <div className="flex h-full bg-slate-100">
      <div className="no-scrollbar w-4/12 min-w-[500px] overflow-y-auto p-12">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          <a
            className="text-slate-500 hover:text-slate-600"
            href="https://github.com/hpiaia/smartrr-currency-converter"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon className="ml-2" />
          </a>
        </div>

        <Button className="mt-12" onClick={() => setCreateModalOpen(true)}>
          Create conversion
        </Button>

        <ConversionsList />
      </div>

      <div className="no-scrollbar h-full w-8/12 overflow-y-auto rounded-l-3xl bg-white px-16 py-12">
        <Outlet />
      </div>

      <CreateConversionModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} />
    </div>
  )
}
