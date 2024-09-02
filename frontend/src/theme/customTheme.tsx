import { DefaultTheme } from "styled-components";

interface CustomTheme extends DefaultTheme {
  colors: {
    primaryBackground: string;
    secondaryBackground: string;
    white: string;
    lightGray: string;
    lightWhite: string;
    primary: string;
    secondary: string;
    lighter: string;
    accent: string;
    darkAccent: string;
    contrast: string;
    hoverTextColor: string;
    hoverBackgroundColor: string;
  };
  fonts: {
    body: string;
    heading: string;
    serif: string;
    mono: string;
    fancy: string;
    fancy2: string;
  };
  fontSizes: {
    small: string;
    medium: string;
    large: string;
    extraSmall: string;
    extraLarge: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
    circle: string;
  };
  sizes: {
    navbarHeight: string;
    controllerHeight: string;
  };
}

export const theme: CustomTheme = {
  colors: {
    primaryBackground: "#000000", // Black for main background
    secondaryBackground: "#121212", // Dark gray for secondary areas
    white: "#FFFFFF", // Pure white for text and important elements
    lightGray: "#B3B3B3", // Light gray for borders and subtle text
    lightWhite: "#F0F0F0", // Off-white for softer contrast elements
    primary: "#FF4C24", // Bright orange for primary actions and highlights
    secondary: "#FFFFFF", // White for secondary elements and text
    lighter: "#FFD4C3", // Light orange for highlights and subtle accents
    accent: "#FF4C24", // Main accent color, consistent with primary
    darkAccent: "#E64A19", // Darker orange for hover states and active elements
    contrast: "#F1F1F1", // High-contrast light color for better readability
    hoverTextColor: "#000000", // Black for text on hover, to stand out
    hoverBackgroundColor: "#FFD4C3", // Light orange for hover backgrounds
  },
  fonts: {
    fancy: "'Agbalumo', system-ui",
    fancy2: "'Lobster', sans-serif",
    body: "'Roboto', sans-serif",
    heading: "'Open Sans', sans-serif",
    serif: "'Merriweather', serif",
    mono: "'Roboto Mono', monospace",
  },
  fontSizes: {
    small: "11px",
    medium: "15px",
    large: "20px",
    extraSmall: "12px",
    extraLarge: "24px",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
    circle: "50%",
  },
  sizes: {
    navbarHeight: "70px",
    controllerHeight: "70px",
  },
};
