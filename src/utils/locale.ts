import * as Localization from "expo-localization";

export const isPortuguese = () => {
  return Localization.getLocales()[0].languageCode === "pt";
};
