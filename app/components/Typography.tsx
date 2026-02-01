import React, { memo } from "react";
import { StyleSheet, StyleProp, Text, TextProps, TextStyle } from "react-native";

type TypographyVariant = "display" | "heading" | "title" | "label" | "body" | "caption";

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  weight?: TextStyle["fontWeight"];
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const BASE_COLOR = "#363F47";

const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  color = BASE_COLOR,
  weight,
  style,
  children,
  ...textProps
}) => {
  const variantStyle = variantStyles[variant];

  return (
    <Text
      {...textProps}
      style={[
        variantStyle,
        weight ? { fontWeight: weight } : null,
        color ? { color } : null,
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const variantStyles = StyleSheet.create({
  display: {
    fontSize: 56,
    fontWeight: "700",
    fontFamily: "PoppinsBold"
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "PoppinsBold"
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "PoppinsSemiBold"
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "PoppinsMedium"
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "PoppinsRegular"
  },
  caption: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "PoppinsRegular"
  },
});

export type { TypographyProps, TypographyVariant };
export default memo(Typography);
