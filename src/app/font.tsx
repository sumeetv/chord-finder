import { Montserrat, PT_Serif } from 'next/font/google'

export const defaultFont = PT_Serif({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const headerFont = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
  })