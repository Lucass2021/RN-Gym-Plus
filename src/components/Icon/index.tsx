import {Colors} from "@/theme/colors";
import {IconName, iconRegistry} from "@/theme/icons";
import {TouchableOpacityProps} from "react-native";

export interface IconButtonProps extends TouchableOpacityProps {
  iconName: IconName;
  iconColor: keyof typeof Colors;
  iconStrokeColor?: keyof typeof Colors;
  iconWidth: number;
  iconHeight: number;
}

export default function CustomIcon({
  iconName,
  iconColor,
  iconStrokeColor = "dark",
  iconWidth,
  iconHeight,
}: IconButtonProps) {
  const IconComponent = iconRegistry[iconName];
  const color = Colors[iconColor];
  const strokeColor = Colors[iconStrokeColor];

  return (
    <IconComponent
      color={color}
      width={iconWidth}
      height={iconHeight}
      stroke={strokeColor}
    />
  );
}
