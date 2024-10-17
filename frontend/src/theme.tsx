import {
  extendTheme,
  createMultiStyleConfigHelpers,
} from "@chakra-ui/react";

import {
  defineStyle
} from "@chakra-ui/styled-system";

export const inputStyle = defineStyle((props) => {
  return {
    field: {
      borderColor: "72BF78",
      // change font family to mono
    },
  };
});

const disabledStyles = {
  _disabled: {
    backgroundColor: "ui.light",
  },
}

const theme = extendTheme({
  colors: {
    ui: {
      main: "#009688",
      secondary: "#EDF2F7",
      success: "#48BB78",
      danger: "#E53E3E",
      light: "B7E0FF",
      dark: "#1A202C",
      darkSlate: "#252D3D",
      dim: "#A0AEC0",
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          backgroundColor: "ui.main",
          color: "ui.light",
          _hover: {
            backgroundColor: "#00766C",
          },
          _disabled: {
            ...disabledStyles,
            _hover: {
              ...disabledStyles,
            },
          },
        },
        danger: {
          backgroundColor: "ui.danger",
          color: "ui.light",
          _hover: {
            backgroundColor: "#E32727",
          },
        },
      },
    },

    Tabs: {
      variants: {
        enclosed: {
          tab: {
            _selected: {
              color: "ui.main",
            },
          },
        },
      },
    },
  },

  styles: {
    global: (props) => ({
      body: {
        bg: "antiqueWhite",
        fontFamily: "cursive",
        fontSize:"large"
      },
    }),
  },
});



export default theme
