import {Colors, textColors} from "@/theme/colors";
import {ButonsText, Texts, Titles} from "@/theme/text";
import React from "react";
import {Text, TextProps as RNTextProps} from "react-native";

interface TextProps extends RNTextProps {
  children: React.ReactNode;
  color: keyof typeof textColors;
  fontFamily: "Inter" | "BebasNeue";
  fontWeight: "Light" | "Regular" | "Medium" | "SemiBold" | "Bold";
  fontSize: keyof typeof Titles | keyof typeof Texts | keyof typeof ButonsText;
  customClassName?: string;
}

export default function TextComponent({
  children,
  color,
  fontFamily,
  fontWeight,
  fontSize,
  customClassName,
  ...props
}: TextProps) {
  const generateFontFamilyAndWeight = (
    fontFamily: string,
    fontWeight: string,
  ): string => {
    const fontMap = {
      Inter: {
        Light: "Inter_300Light",
        Regular: "Inter_400Regular",
        Medium: "Inter_500Medium",
        SemiBold: "Inter_600SemiBold",
        Bold: "Inter_700Bold",
      },
      BebasNeue: {
        Regular: "BebasNeue_400Regular",
        Light: "BebasNeue_400Regular",
        Medium: "BebasNeue_400Regular",
        SemiBold: "BebasNeue_400Regular",
        Bold: "BebasNeue_400Regular",
      },
    };

    return (
      fontMap[fontFamily as keyof typeof fontMap]?.[
        fontWeight as keyof typeof fontMap.Inter
      ] || "Inter_400Regular"
    );
  };

  const customColorName = Colors[color];

  const customFontSizeAndLineHeight =
    Titles[fontSize as keyof typeof Titles] ||
    Texts[fontSize as keyof typeof Texts] ||
    ButonsText[fontSize as keyof typeof ButonsText];
  const fontClass = generateFontFamilyAndWeight(fontFamily, fontWeight);

  return (
    <Text
      className={`${customClassName}`}
      style={{
        fontFamily: fontClass,
        color: customColorName,
        fontSize: customFontSizeAndLineHeight.fontSize,
        lineHeight: customFontSizeAndLineHeight.lineHeight,
      }}
      {...props}>
      {children}
    </Text>
  );
}
