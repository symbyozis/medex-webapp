import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "var(--main-font)",
    fontSize: 14,
    h1: {
      fontWeight: 600,
      fontSize: 46,
      color: "var(--heading-color)",
      fontFamily: "var(--heading-font)",
    },
    h2: {
      fontWeight: 600,
      fontFamily: "var(--heading-font)",
    },
    h3: {
      fontWeight: 600,
      fontSize: 30,
      color: "var(--heading-color)",
      fontFamily: "var(--heading-font)",
    },
    h4: {
      fontWeight: 600,
      fontSize: 24,
      color: "var(--heading-color)",
      fontFamily: "var(--heading-font)",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      fontFamily: "var(--heading-font)",
    },
  },
  palette: {
    primary: {
      main: "rgba(33, 205, 170, 1)",
    },
    secondary: {
      main: "#585858",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 25,
        },
        notchedOutline: {
          border: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          border: "none",
          background: "rgba(var(--input-bg), .15)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          textTransform: "none",
          transition: "none",
          padding: "10px 25px",
        },
        contained: {
          color: "#fff",
          boxShadow: "0 6px 20px -8px var(--primary-color)",
        },
        containedSizeLarge: {
          height: "60px",
        },
      },
    },
  },
});
