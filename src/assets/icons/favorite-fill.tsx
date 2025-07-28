import React from "react";
import Svg, {Path} from "react-native-svg";

type FavoriteFillProps = {
  color?: string;
  stroke?: string;
  width?: number;
  height?: number;
};

export const FavoriteFillComponent = ({
  color = "black",
  stroke = "black",
  width = 20,
  height = 20,
}: FavoriteFillProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 21 19" fill="none">
      <Path
        d="M17.2909 2.65036C14.8505 1.24304 12.7207 1.81017 11.4412 2.71355C10.9165 3.08396 10.6542 3.26916 10.4999 3.26916C10.3456 3.26916 10.0833 3.08396 9.5586 2.71355C8.27916 1.81017 6.14927 1.24304 3.70897 2.65036C0.506345 4.49732 -0.218333 10.5906 7.16887 15.7312C8.57591 16.7103 9.27941 17.1998 10.4999 17.1998C11.7204 17.1998 12.4239 16.7103 13.831 15.7312C21.2182 10.5906 20.4934 4.49732 17.2909 2.65036Z"
        fill={color}
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default FavoriteFillComponent;
