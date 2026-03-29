import { memo, useCallback, useState } from "react";
import { StyleSheet, TextInput, View, TextInputProps,  TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import MaterialIcons, { MaterialIconsIconName } from "@react-native-vector-icons/material-icons";
import Typography, { TypographyVariant } from "./Typography";
import { COLORS } from "app/constants/token";

interface CustomFormInputProps extends TextInputProps {
  error?: string;
  type?: "normal" | "password",
  leftIcon?: {
    name: MaterialIconsIconName;
    size: number;
    color?: string;
  },
  wrapperStyle?: StyleProp<ViewStyle>
  textLabel?: string;
  textColor?: string;
  textVariant?: TypographyVariant;
  textStyle?: StyleProp<ViewStyle>;
}

const CustomTextInput = ({
  error = "",
  type = "normal",
  leftIcon,
  wrapperStyle,
  style,
  textLabel,
  textStyle,
  textVariant,
  textColor,
  ...props
}: CustomFormInputProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const errorStyle = error ? { borderColor: "#DC3545", borderWidth: 1.5 } : null
  const visibilityIcon = useCallback(() => {
    if(type !== "password") return null;

    return  <TouchableOpacity onPress={() => setIsVisible(prev => !prev)}>
            <MaterialIcons name={isVisible ? "visibility" : "visibility-off"} color="#000" size={24} />
        </TouchableOpacity>
  }, [type, isVisible])
  
  return <View style={styles.container}>
      {textLabel && <Typography variant={textVariant} style={[{fontWeight: "700", marginLeft: 4}, textStyle]} color={textColor || COLORS.onSurfaceVariant}>{textLabel}</Typography>}
      <View style={[styles.textInputWrapper, errorStyle, style, wrapperStyle]}>
        {leftIcon && <MaterialIcons color={ error ? "#DC3545" : leftIcon.color } {...leftIcon} />}
        <TextInput 
          secureTextEntry={!isVisible && type === "password"} 
          style={[styles.textInput, style]} 
          {...props} 
        />
        {visibilityIcon()}
      </View>
      {error && <Typography variant="caption" style={styles.errorText}>{error}</Typography> }
    </View>
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  },
  textInputWrapper: {
    height: 48,
    backgroundColor: COLORS.surfaceContainer,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    borderRadius: 8,
    paddingHorizontal: 12
  },
  textInput: {
    height: 48,
    width: "100%",
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 2,
    flex: 1,
    fontSize: 18
  },
  errorText:{
    paddingLeft: 8,
    color: COLORS.error
  }
})

export default memo(CustomTextInput)
