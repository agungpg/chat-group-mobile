import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle, StyleProp, TouchableOpacityProps, ActivityIndicator } from "react-native";
import Typography, { TypographyVariant } from "./Typography";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  textVariant?: TypographyVariant;
  outline?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  label,
  isLoading = false,
  disabled = false,
  backgroundColor = "#C73C80",
  textColor = "#fff",
  textVariant = "label",
  outline = false,
  style,
  ...props
}: ButtonProps) => {
  const buttonColor = disabled ? "#C4C4C4" : backgroundColor;
  const borderStyle = outline ? { borderWidth: 1.5, borderColor: textColor } : null;
  const bgColorStyle = { backgroundColor: outline ? "transparent" : buttonColor };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled}
      style={[
        styles.button,
        bgColorStyle,
        borderStyle,
        style,
      ]}
      {...props}
    >
    {isLoading ? 
      <ActivityIndicator size="large" color={textColor} /> : 
      <Typography variant={textVariant} color={textColor} >
        {label}
      </Typography>
    }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});

export type { ButtonProps };
export default memo(Button);
