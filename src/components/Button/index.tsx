import {useState} from "react";
import {Pressable} from "react-native";
import {backgroundColors, Colors, textColors} from "@/theme/colors";
import {fontFamiltyEnum, fontWeightEnum} from "@/@types/fonts";
import TextComponent from "../TextComponent";

type ButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  customClassName?: string;
  customTextColor?: keyof typeof textColors;
  customFontFamily?: fontFamiltyEnum;
  customFontWeight?: fontWeightEnum;
  customBackgroundColor?: keyof typeof backgroundColors;
  customBackgroundOnPressColor?: keyof typeof backgroundColors;
  customDisabledEffect?: number;
};

export default function Button({
  text,
  onPress,
  disabled,
  customClassName,
  customTextColor = "light",
  customFontWeight = "SemiBold",
  customFontFamily = "Inter",
  customBackgroundColor = "secondaryDark",
  customBackgroundOnPressColor = "secondaryDark",
  customDisabledEffect = 300,
  ...props
}: ButtonProps) {
  const [buttonWasPressed, setButtonWasPressed] = useState(false);

  const backgroundColor = disabled
    ? Colors[customBackgroundColor]
    : buttonWasPressed
      ? Colors[customBackgroundOnPressColor]
      : Colors[customBackgroundColor];

  const handleOnPress = () => {
    setButtonWasPressed(true);
    onPress();

    setTimeout(() => {
      setButtonWasPressed(false);
    }, customDisabledEffect);
  };

  return (
    <Pressable
      onPress={handleOnPress}
      disabled={disabled || buttonWasPressed}
      style={{
        opacity: disabled || buttonWasPressed ? 0.7 : 1,
        backgroundColor,
      }}
      className={`h-14 rounded-2xl items-center justify-center ${customClassName}`}
      {...props}>
      <TextComponent
        fontFamily={customFontFamily}
        fontWeight={customFontWeight}
        color={customTextColor}
        fontSize="buttonMd"
        customClassName="text-center">
        {text}
      </TextComponent>
    </Pressable>
  );
}
