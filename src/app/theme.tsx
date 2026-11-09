import { extendTheme } from "@chakra-ui/react";
import { defaultFont, headerFont } from "./font";

const theme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: false },
  styles: { global: { body: { bg: "#0B0F16", color: "#E8EDF5" } } },
  fonts: {
    heading: `${headerFont.style.fontFamily}, sans-serif`,
    body: `${defaultFont.style.fontFamily}, sans-serif`,
  },
  components: {
    Card: {
      variants: {
        "with-shadow": {
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
    Heading: {
      baseStyle: {
        paddingY: "10px",
      },
    },
  },
});

export default theme;
