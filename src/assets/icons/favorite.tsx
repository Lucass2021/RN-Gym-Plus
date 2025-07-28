import React from "react";
import Svg, {Path} from "react-native-svg";

type FavoriteProps = {
  color?: string;
  width?: number;
  height?: number;
};

export const FavoriteComponent = ({
  color = "black",
  width = 20,
  height = 20,
}: FavoriteProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 21 19" fill="none">
      <Path
        d="M17.291 2.65036C14.8506 1.24304 12.7208 1.81017 11.4413 2.71355C10.9166 3.08396 10.6544 3.26916 10.5 3.26916C10.3457 3.26916 10.0834 3.08396 9.55872 2.71355C8.27928 1.81017 6.1494 1.24304 3.70909 2.65036C0.506467 4.49732 -0.218211 10.5906 7.169 15.7312C8.57603 16.7103 9.27953 17.1998 10.5 17.1998C11.7205 17.1998 12.424 16.7103 13.8311 15.7312C21.2183 10.5906 20.4936 4.49732 17.291 2.65036Z"
        stroke={color}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default FavoriteComponent;
