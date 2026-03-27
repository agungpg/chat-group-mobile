import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle, StyleProp, TouchableOpacityProps, ActivityIndicator, TextStyle } from "react-native";
import Typography, { TypographyVariant } from "./Typography";
import MaterialIcons, { MaterialIconsIconName } from "@react-native-vector-icons/material-icons";
import { COLORS } from "app/constants/token";

interface ButtonProps extends TouchableOpacityProps {
  label?: string;
  isLoading?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  textVariant?: TypographyVariant;
  textStyle?: StyleProp<TextStyle>;
  outline?: boolean;
  style?: StyleProp<ViewStyle>;
  withIcon?: {
    name: MaterialIconsIconName;
    size: number;
    color?: string;
    position: "left" | "right"
  }
}

const Button = ({
  label,
  isLoading = false,
  disabled = false,
  backgroundColor = COLORS.primary,
  textColor = "#fff",
  textVariant = "label",
  outline = false,
  style,
  textStyle,
  withIcon,
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
    {withIcon?.position === "left" && <MaterialIcons color={withIcon.color } {...withIcon} />}
    {label && (isLoading ? 
      <ActivityIndicator size="large" color={textColor} /> : 
      <Typography style={textStyle} variant={textVariant} color={textColor} >
        {label}
      </Typography>
    )}
    {withIcon?.position === "right" && <MaterialIcons color={withIcon.color } {...withIcon} />}
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
