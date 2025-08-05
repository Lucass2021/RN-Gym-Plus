import {Colors} from "@/theme/colors";
import React, {useRef, useState} from "react";
import {StyleSheet, View, Platform} from "react-native";
import {Dropdown} from "react-native-element-dropdown";
import {useController, useFormContext} from "react-hook-form";
import TextComponent from "../TextComponent";
import {AntDesign} from "@expo/vector-icons";

export type SelectInputProps = {
  data: {label: string; value: string | number}[];
  title: string;
  placeholder: string;
  name: string;
  iconName?: React.ComponentProps<typeof AntDesign>["name"];
  iconSize?: number;
  iconColor?: keyof typeof Colors;
};

interface DropdownRef {
  open: () => void;
  close: () => void;
}

export default function SelectInput({
  data,
  title,
  placeholder,
  name,
  iconName,
  iconSize = 20,
  iconColor = "primary",
}: SelectInputProps) {
  const {control} = useFormContext();

  const {
    field: {onChange, onBlur, value},
    fieldState: {error},
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  const [isFocus, setIsFocus] = useState(false);
  const dropdownRef = useRef<DropdownRef>(null);

  return (
    <View className="w-full mb-5">
      <TextComponent
        fontFamily="Inter"
        fontWeight="Medium"
        color={`${error ? "accent" : "dark"}`}
        fontSize="paragraphTwo"
        customClassName="mb-2">
        {title}
      </TextComponent>

      <View
        className={`flex-row items-center border rounded-2xl ${
          error
            ? "border-accent"
            : isFocus
              ? "border-primary"
              : "border-grayFour"
        }`}>
        <Dropdown
          ref={dropdownRef}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            setIsFocus(false);
            onBlur();
          }}
          onChange={item => {
            onChange(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <View className="mr-5">
              <AntDesign
                name={iconName}
                size={iconSize}
                color={Colors[iconColor]}
              />
            </View>
          )}
        />
      </View>
      {error && (
        <TextComponent
          fontFamily="Inter"
          fontWeight="SemiBold"
          color="accent"
          fontSize="paragraphOne"
          customClassName="mt-1">
          {error.message}
        </TextComponent>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
    height: 42,
    paddingHorizontal: 16,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    color: Colors.gray,
    ...(Platform.OS === "ios" && {lineHeight: 16}),
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "Inter",
    color: Colors.dark,
    ...(Platform.OS === "ios" && {lineHeight: 16}),
  },
});
