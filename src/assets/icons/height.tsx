import React from "react";
import Svg, {Path} from "react-native-svg";

type HeightProps = {
  color?: string;
  width?: number;
  height?: number;
};

export const HeightComponent = ({
  color = "black",
  width = 20,
  height = 20,
}: HeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22V2M12 22L8 18M12 22L16 18M12 2L8 6M12 2L16 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HeightComponent;
