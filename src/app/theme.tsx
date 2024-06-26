import { extendTheme } from '@chakra-ui/react'
import { defaultFont, headerFont } from './font'

const theme = extendTheme({
  fonts: {
    heading: `${headerFont.style.fontFamily}, sans-serif`,
    body: `${defaultFont.style.fontFamily}, sans-serif`,
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          boxShadow: "md",
          transition: "all 0.1s ease-in-out",
          _hover: {
            md: {
              boxShadow: "xl",
              transform: "translateY(-5px)",
            },
          },
        },
      },
    },
  },
})

export default theme