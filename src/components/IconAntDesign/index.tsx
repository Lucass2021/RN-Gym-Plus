import {Colors} from "@/theme/colors";
import {AntDesign} from "@expo/vector-icons";
import {TextStyle} from "react-native";

type AntDesignIconName = React.ComponentProps<typeof AntDesign>["name"];

export interface IconButtonProps {
  name: AntDesignIconName;
  size?: number;
  color?: string | keyof typeof Colors;
  style?: TextStyle;
}

export default function CustomIconAntDesign({
  name,
  size = 24,
  color,
  style,
}: IconButtonProps) {
  const iconColor =
    color && color in Colors ? Colors[color as keyof typeof Colors] : color;

  return <AntDesign name={name} size={size} color={iconColor} style={style} />;
}
