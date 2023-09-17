import { ImgHTMLAttributes } from 'react'

import logo from '@/assets/logo.png'
import { cn } from '@/utils'

type Props = ImgHTMLAttributes<HTMLImageElement>

export default function Logo({ className, ...props }: Props) {
  return <img src={logo} className={cn('h-16', className)} {...props} />
}
