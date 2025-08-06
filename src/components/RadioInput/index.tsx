import React from "react";
import {Controller, useFormContext} from "react-hook-form";
import {TouchableOpacity, View} from "react-native";
import TextComponent from "../TextComponent";

export interface RadioItem {
  id: string;
  label: string;
  value: string;
}

interface RadioInputProps {
  items: RadioItem[];
  label?: string;
  name: string;
  required?: boolean;
  isFlexColumn?: boolean;
}

export function RadioInput({
  items,
  label,
  name,
  required,
  isFlexColumn,
}: RadioInputProps) {
  const {control} = useFormContext();

  const renderRadioButton = (
    item: RadioItem,
    selectedValue: string,
    // eslint-disable-next-line no-unused-vars
    onChange: (value: string) => void,
  ) => {
    const isSelected = selectedValue === item.value;

    return (
      <TouchableOpacity
        key={item.id}
        className={`flex-row items-center ${isFlexColumn ? "" : "mr-4"}`}
        onPress={() => onChange(item.value)}>
        <View
          className={`h-5 w-5 rounded-full border-2 items-center justify-center mr-2 ${
            isSelected ? "border-primary" : "border-gray"
          }`}>
          {isSelected && <View className="h-2.5 w-2.5 rounded-full bg-dark" />}
        </View>

        <TextComponent
          color={isSelected ? "primary" : "gray"}
          fontFamily="Inter"
          fontSize="paragraphOne"
          fontWeight="Regular">
          {item.label}
        </TextComponent>
      </TouchableOpacity>
    );
  };

  return (
    <View className="mb-4 w-full">
      {label && (
        <TextComponent
          fontFamily="Inter"
          fontWeight="Medium"
          color={"dark"}
          fontSize="paragraphTwo"
          customClassName="mb-2">
          {label} {required && "*"}
        </TextComponent>
      )}

      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <View>
            <View
              className={`flex-wrap ${isFlexColumn ? "flex-col" : "flex-row"}`}>
              {items.map(item => renderRadioButton(item, value, onChange))}
            </View>

            {error && (
              <TextComponent
                color="accent"
                fontSize="error"
                fontFamily="Inter"
                fontWeight="Regular"
                customClassName="mt-1">
                {error.message}
              </TextComponent>
            )}
          </View>
        )}
      />
    </View>
  );
}
