import {StyleSheet, Text, View} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

type SelectedInputProps = {
  name: string;
  options: string[];
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  label: string;
  required: boolean;
};

export const SelectInput = ({
  name,
  options,
  onChange,
  label,
  required,
}: SelectedInputProps) => {
  console.log("name", name);
  console.log("options", options);
  console.log("onChange", onChange);
  console.log("label", label);
  console.log("required", required);

  const emojisWithIcons = [
    {title: "happy", icon: "emoticon-happy-outline"},
    {title: "cool", icon: "emoticon-cool-outline"},
    {title: "lol", icon: "emoticon-lol-outline"},
    {title: "sad", icon: "emoticon-sad-outline"},
    {title: "cry", icon: "emoticon-cry-outline"},
    {title: "angry", icon: "emoticon-angry-outline"},
    {title: "confused", icon: "emoticon-confused-outline"},
    {title: "excited", icon: "emoticon-excited-outline"},
    {title: "kiss", icon: "emoticon-kiss-outline"},
    {title: "devil", icon: "emoticon-devil-outline"},
    {title: "dead", icon: "emoticon-dead-outline"},
    {title: "wink", icon: "emoticon-wink-outline"},
    {title: "sick", icon: "emoticon-sick-outline"},
    {title: "frown", icon: "emoticon-frown-outline"},
  ];

  return (
    <SelectDropdown
      data={emojisWithIcons}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      renderButton={selectedItem => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || "Select your mood"}
            </Text>
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && {backgroundColor: "#D2D9DF"}),
            }}>
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
