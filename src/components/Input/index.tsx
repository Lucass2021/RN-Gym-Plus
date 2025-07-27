import {Ionicons} from "@expo/vector-icons";
import {useRef, useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {
  TextInputProps as RnTextInputProps,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TextComponent from "../TextComponent";

type InputProps = {
  name: string;
  customPlaceholder: string;
  customInputTitle: string;
} & RnTextInputProps;

export default function Input({
  name,
  customPlaceholder,
  customInputTitle,
  secureTextEntry,
  className,
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
        <TextInput
          ref={textInputRef}
          className={`flex-1 font-TTInterphasesLight color-black text-base px-5 h-12  ${className}`}
          placeholder={customPlaceholder}
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
