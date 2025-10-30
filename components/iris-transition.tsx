import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, {
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Defs, Mask, Rect } from "react-native-svg";

const { width, height } = Dimensions.get("window");
const maxRadius = Math.sqrt(width ** 2 + height ** 2);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface IrisProps {
  type: "in" | "out";
  duration?: number;
  onComplete?: () => void;
}

export default function IrisTransition({ type, duration = 900, onComplete }: IrisProps) {
  const radius = useSharedValue(type === "in" ? 0 : maxRadius);

  useEffect(() => {
    radius.value = withTiming(
      type === "in" ? maxRadius : 0,
      { duration },
      () => onComplete && onComplete()
    );
  }, [type]);

  const animatedProps = useAnimatedProps(() => ({
    r: radius.value,
  }));

  return (
    <Svg
      width={width}
      height={height}
      style={{ position: "absolute", top: 0, left: 0, zIndex: 999 }}
    >
      <Defs>
        <Mask id="irisMask">
          {/* Inverted logic: black means hidden, white means visible */}
          <Rect width={width} height={height} fill="white" />
          <AnimatedCircle
            cx={width / 2}
            cy={height / 2}
            animatedProps={animatedProps}
            fill="black"
          />
        </Mask>
      </Defs>
      {/* This black rect covers screen except for the circle */}
      <Rect
        width={width}
        height={height}
        fill="black"
        mask="url(#irisMask)"
      />
    </Svg>
  );
}