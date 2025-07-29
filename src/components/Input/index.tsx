import {AntDesign, Ionicons} from "@expo/vector-icons";
import {useRef, useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {
  TextInputProps as RnTextInputProps,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import TextComponent from "../TextComponent";
import {IconName} from "@/theme/icons";
import CustomIcon from "../Icon";
import {Colors} from "@/theme/colors";
import CustomIconAntDesign from "../IconAntDesign";

type AntDesignIconName = React.ComponentProps<typeof AntDesign>["name"];

type InputProps = {
  name: string;
  customPlaceholder: string;
  customInputTitle: string;

  iconName?: IconName;
  iconColor?: keyof typeof Colors;
  iconStrokeColor?: keyof typeof Colors;
  iconWidth?: number;
  iconHeight?: number;

  iconNameAntDesign?: AntDesignIconName;
  iconSizeAntDesign?: number;
  iconColorAntDesign?: keyof typeof Colors;
  iconStyle?: TextStyle;
} & RnTextInputProps;

export default function Input({
  name,
  customPlaceholder,
  customInputTitle,
  secureTextEntry,
  className,
  iconName,
  iconColor,
  iconWidth,
  iconHeight,
  iconNameAntDesign,
  iconSizeAntDesign,
  iconColorAntDesign,
  iconStyle,
  ...props
}: InputProps) {
  const [isSecure, setIsSecure] = useState(secureTextEntry ?? false);
  const textInputRef = useRef<TextInput>(null);

  const {control} = useFormContext();

  const {
    field: {onChange, onBlur, value},
    fieldState: {error},
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  const showCustomIcon = iconName !== undefined;
  const showCustomIconAntDesign = iconNameAntDesign !== undefined;

  return (
    <View className="w-full mb-5">
      <TextComponent
        fontFamily="Inter"
        fontWeight="Medium"
        color={`${error ? "accent" : "dark"}`}
        fontSize="paragraphTwo"
        customClassName="mb-2">
        {customInputTitle}
      </TextComponent>
      <View
        className={`flex-row items-center border rounded-2xl ${error ? "border-red-500" : "border-grayFour"}`}>
        {showCustomIcon && (
          <View className="ml-5 ">
            <CustomIcon
              iconName={iconName}
              iconColor={iconColor || "primary"}
              iconWidth={iconWidth || 20}
              iconHeight={iconHeight || 20}
            />
          </View>
        )}
        {showCustomIconAntDesign && (
          <View className="ml-5 ">
            <CustomIconAntDesign
              name={iconNameAntDesign}
              size={iconSizeAntDesign}
              color={iconColorAntDesign}
              style={iconStyle}
            />
          </View>
        )}

        <TextInput
          ref={textInputRef}
          className={`flex-1 font-TTInterphasesLight color-black text-base px-5 h-12 ${className}`}
          placeholder={customPlaceholder}
          placeholderTextColor={Colors.gray}
          style={Platform.OS === "ios" && {lineHeight: 16, fontSize: 14}}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          secureTextEntry={isSecure}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            className="px-3"
            hitSlop={15}>
            <Ionicons
              name={isSecure ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <TextComponent
          fontFamily="Inter"
          fontWeight="SemiBold"
          color="accent"
          fontSize="error"
          customClassName="mt-3">
          {error.message}
        </TextComponent>
      )}
    </View>
  );
}
