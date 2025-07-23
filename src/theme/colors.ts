export const Colors = {
  primary: "#3581B8",
  secondary: "#A594F9",
  accent: "#E54B4B",
  warning: "#DBE147",
  light: "#FFFFFF",
  dark: "#000000",
  gray: "#616161",
  confirm: "#A9E5BB",
  transparent: "transparent",
} as const;

export const generateColorClasses = (prefix: string) =>
  Object.keys(Colors).reduce((acc, key) => {
    const typedKey = key as keyof typeof Colors;
    acc[typedKey] = `${prefix}-${key}`;
    return acc;
  }, {} as Record<keyof typeof Colors, string>);

export const backgroundColors = generateColorClasses("bg");
export const textColors = generateColorClasses("text");
