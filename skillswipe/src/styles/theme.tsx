import { extendTheme } from "@chakra-ui/react";

export const mytheme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  styles: {
    global: {
      "html, body": {
        backgroundColor: "brand.100",
        color: "brand.900",
      },
    },
  },
});
