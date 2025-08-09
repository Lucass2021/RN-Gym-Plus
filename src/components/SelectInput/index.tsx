import {Colors} from "@/theme/colors";
import React, {useRef, useState} from "react";
import {StyleSheet, View, Platform, TextStyle} from "react-native";
import {Dropdown} from "react-native-element-dropdown";
import {useController, useFormContext} from "react-hook-form";
import TextComponent from "../TextComponent";
import {AntDesign} from "@expo/vector-icons";
import {IconName} from "@/theme/icons";
import CustomIcon from "../Icon";
import CustomIconAntDesign from "../IconAntDesign";

type AntDesignIconName = React.ComponentProps<typeof AntDesign>["name"];

export type SelectInputProps = {
  data: {label: string; value: string | number}[];
  title?: string;
  placeholder: string;
  name: string;
  iconName?: IconName;
  iconColor?: keyof typeof Colors;
  iconStrokeColor?: keyof typeof Colors;
  iconWidth?: number;
  iconHeight?: number;
  iconNameAntDesign?: AntDesignIconName;
  iconSizeAntDesign?: number;
  iconColorAntDesign?: keyof typeof Colors;
  iconStyleAntDesign?: TextStyle;
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
  iconColor,
  iconWidth,
  iconHeight,
  iconNameAntDesign,
  iconSizeAntDesign,
  iconColorAntDesign,
  iconStyleAntDesign,
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

  const showCustomIcon = iconName !== undefined;
  const showCustomIconAntDesign = iconNameAntDesign !== undefined;

  return (
    <View className="w-full mb-5">
      {title && (
        <TextComponent
          fontFamily="Inter"
          fontWeight="Medium"
          color={`${error ? "accent" : "dark"}`}
          fontSize="paragraphTwo"
          customClassName="mb-2">
          {title}
        </TextComponent>
      )}

      <View
        className={`flex-row items-center border rounded-2xl 
          ${
            error
              ? "border-accent"
              : isFocus
                ? "border-primary"
                : "border-grayFour"
          }
        ${title ? "mt-0" : "mt-5"}
        `}>
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
              {showCustomIcon && (
                <View className="ml-1">
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
                    style={iconStyleAntDesign}
                  />
                </View>
              )}
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
