import { Merriweather, Open_Sans } from 'next/font/google'

export const defaultFont = Open_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const headerFont = Merriweather({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
  })