import { extendTheme, createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

// default base style from the Input theme
const baseStyle = definePartsStyle({
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

const variantInput = definePartsStyle((props) => {
  return {
    field: {
      fontFamily: "cursive", // change font family to mono
      bg: "white",
      borderColor: "009688",
      fontsize: "large",

      _focus: {
        borderColor: "green.500",
        _dark: {
          bg: "whiteAlpha.100",
        },
      },
      _hover: {
        bg: "green.50",
        borderColor: "009688",
        _dark: {
          bg: "whiteAlpha.100",
        },
      },
    },
  };
});


const disabledStyles = {
  _disabled: {
    backgroundColor: "ui.light",
  },
};
const variants = {
  outline: variantInput
}
const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    size: "md",
    variant: "outline",
  
  },
});

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
    Input:inputTheme,
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
        fontSize: "large",
      },
    }),
  },
});

export default theme;
