import { createMuiTheme, fade } from "@material-ui/core";
import React from "react";
import "./App.css";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    customColors: {
      numberChange: {
        positive: {
          color: React.CSSProperties["color"];
          backgroundColor: React.CSSProperties["color"];
        };
        negative: {
          color: React.CSSProperties["color"];
          backgroundColor: React.CSSProperties["color"];
        };
      };
    };
  }
  interface ThemeOptions {
    customColors: {
      numberChange: {
        positive: {
          color: React.CSSProperties["color"];
          backgroundColor: React.CSSProperties["color"];
        };
        negative: {
          color: React.CSSProperties["color"];
          backgroundColor: React.CSSProperties["color"];
        };
      };
    };
  }
}

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        ".MuiCard-root": {
          borderRadius: "8px",
        },
        ".MuiButton-root": {
          borderRadius: "500px",
        },
      },
    },
  },
  palette: {
    type: "dark",
    primary: {
      light: "#757ce8",
      main: "#1EB980",
      dark: "#045D56",
      contrastText: "#fff",
    },
  },
  customColors: {
    numberChange: {
      positive: {
        color: "#41CE3E",
        backgroundColor: fade("#41CE3E", 0.15),
      },
      negative: {
        color: "#FF6262",
        backgroundColor: fade("#FF6262", 0.15),
      },
    },
  },
});
