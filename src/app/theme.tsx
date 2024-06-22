import { extendTheme } from '@chakra-ui/react'
import { defaultFont, headerFont } from './font'

const theme = extendTheme({
  fonts: {
    heading: `${headerFont.style.fontFamily}, sans-serif`,
    body: `${defaultFont.style.fontFamily}, sans-serif`,
  },
})

export default theme