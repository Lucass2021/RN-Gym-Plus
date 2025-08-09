import {AntDesign, Ionicons} from "@expo/vector-icons";
import {useRef, useState, useEffect} from "react";
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
import {isPortuguese} from "@/utils/locale";

type AntDesignIconName = React.ComponentProps<typeof AntDesign>["name"];

type InputProps = {
  name: string;
  customPlaceholder: string;
  customInputTitle?: string;
  customMask?: "birthDate" | "weight" | "height";
  iconName?: IconName;
  iconColor?: keyof typeof Colors;
  iconStrokeColor?: keyof typeof Colors;
  iconWidth?: number;
  iconHeight?: number;
  iconNameAntDesign?: AntDesignIconName;
  iconSizeAntDesign?: number;
  iconColorAntDesign?: keyof typeof Colors;
  iconStyleAntDesign?: TextStyle;
} & RnTextInputProps;

const applyMask = (
  value: string,
  maskType?: "birthDate" | "weight" | "height",
) => {
  if (!maskType) return value;

  switch (maskType) {
    case "birthDate":
      return formatBirthDate(value);
    case "weight":
      return formatWeight(value);
    case "height":
      return formatHeight(value);
    default:
      return value;
  }
};

const formatBirthDate = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  const maxLength = 8;

  if (cleaned.length > maxLength) {
    return cleaned.slice(0, maxLength);
  }

  if (isPortuguese()) {
    // dd/mm/yyyy
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4)
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  } else {
    // mm/dd/yyyy
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4)
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  }
};

const formatWeight = (value: string) => {
  const cleaned = value.replace(/[^0-9.]/g, "");

  const parts = cleaned.split(".");
  if (parts.length > 2) {
    return `${parts[0]}.${parts.slice(1).join("")}`;
  }

  if (cleaned.length > 3) {
    return cleaned.slice(0, 3);
  }

  return cleaned;
};

const formatHeight = (value: string) => {
  const cleaned = value.replace(/[^0-9.]/g, "");

  const parts = cleaned.split(".");
  if (parts.length > 2) {
    return `${parts[0]}.${parts.slice(1).join("")}`;
  }

  if (cleaned.length > 3) {
    return cleaned.slice(0, 3);
  }

  return cleaned;
};

export default function Input({
  name,
  customPlaceholder,
  customInputTitle,
  customMask,
  secureTextEntry,
  className,
  iconName,
  iconColor,
  iconWidth,
  iconHeight,
  iconNameAntDesign,
  iconSizeAntDesign,
  iconColorAntDesign,
  iconStyleAntDesign,
  ...props
}: InputProps) {
  const [isSecure, setIsSecure] = useState(secureTextEntry ?? false);
  const [displayValue, setDisplayValue] = useState("");
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

  useEffect(() => {
    setDisplayValue(applyMask(value, customMask));
  }, [value, customMask]);

  const handleChange = (text: string) => {
    const maskedValue = applyMask(text, customMask);
    onChange(maskedValue);

    if (text.length < 11) {
      setDisplayValue(maskedValue);
    }
  };

  const showCustomIcon = iconName !== undefined;
  const showCustomIconAntDesign = iconNameAntDesign !== undefined;

  return (
    <View className="w-full mb-5">
      {customInputTitle && (
        <TextComponent
          fontFamily="Inter"
          fontWeight="Medium"
          color={`${error ? "accent" : "dark"}`}
          fontSize="paragraphTwo"
          customClassName="mb-2">
          {customInputTitle}
        </TextComponent>
      )}

      <View
        className={`
        flex-row items-center border rounded-2xl 
        ${error ? "border-red-500" : "border-grayFour"}
        ${customInputTitle ? "mt-0" : "mt-5"}
        `}>
        {showCustomIcon && (
          <View className="ml-5">
            <CustomIcon
              iconName={iconName}
              iconColor={iconColor || "primary"}
              iconWidth={iconWidth || 20}
              iconHeight={iconHeight || 20}
            />
          </View>
        )}
        {showCustomIconAntDesign && (
          <View className="ml-5">
            <CustomIconAntDesign
              name={iconNameAntDesign}
              size={iconSizeAntDesign}
              color={iconColorAntDesign}
              style={iconStyleAntDesign}
            />
          </View>
        )}

        <TextInput
          ref={textInputRef}
          className={`flex-1 font-TTInterphasesLight color-black text-base px-5 h-12 ${className}`}
          placeholder={customPlaceholder}
          placeholderTextColor={Colors.gray}
          style={Platform.OS === "ios" && {lineHeight: 16, fontSize: 14}}
          onChangeText={handleChange}
          onBlur={onBlur}
          value={displayValue}
          secureTextEntry={isSecure}
          keyboardType={customMask ? "numeric" : props.keyboardType}
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
