export const Colors = {
  primary: "#3581B8",
  primaryDark: "#1F5F8A",
  primaryLight: "#5DA1D2",

  secondary: "#A594F9",
  secondaryDark: "#7C6AE2",
  secondaryLight: "#C7BDFD",

  accent: "#E54B4B",
  accentDark: "#B83636",
  accentLight: "#F07373",

  warning: "#DBE147",
  warningDark: "#AEB532",
  warningLight: "#EFF38C",

  confirm: "#A9E5BB",
  confirmDark: "#79C394",
  confirmLight: "#C6F1D3",

  gray: "#616161",
  grayDark: "#3A3A3A",
  grayLight: "#BDBDBD",

  light: "#FFFFFF",
  dark: "#000000",

  backgroundLight: "#F9F9F9",
  backgroundDark: "#121212",

  textPrimary: "#1E1E1E",
  textSecondary: "#5F5F5F",
  textInverse: "#FFFFFF",

  border: "#E0E0E0",

  transparent: "transparent",
} as const;

export const generateColorClasses = (prefix: string) =>
  Object.keys(Colors).reduce(
    (acc, key) => {
      const typedKey = key as keyof typeof Colors;
      acc[typedKey] = `${prefix}-${key}`;
      return acc;
    },
    {} as Record<keyof typeof Colors, string>,
  );

export const backgroundColors = generateColorClasses("bg");
export const textColors = generateColorClasses("text");
