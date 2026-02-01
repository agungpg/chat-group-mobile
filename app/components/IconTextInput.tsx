import { memo, useCallback, useState } from "react";
import { StyleSheet, TextInput, View, TextInputProps,  TouchableOpacity } from "react-native";
import MaterialIcons, { MaterialIconsIconName } from "@react-native-vector-icons/material-icons";
import Typography from "./Typography";

interface CustomFormInputProps extends TextInputProps {
  error?: string;
  type?: "normal" | "password",
  leftIcon?: {
    name: MaterialIconsIconName;
    size: number;
    color?: string;
  }
}

const CustomTextInput = ({
  error = "",
  type = "normal",
  leftIcon,
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
      <View style={[styles.textInputWrapper, errorStyle]}>
        {leftIcon && <MaterialIcons color={ error ? "#DC3545" : leftIcon.color } {...leftIcon} />}
        <TextInput 
          secureTextEntry={!isVisible && type === "password"} 
          style={[styles.textInput]} 
          {...props} 
        />
        {visibilityIcon()}
      </View>
      {error && <Typography variant="caption" style={styles.errorText}>{error}</Typography> }
    </View>
}

const styles = StyleSheet.create({
  container: {
    gap: 4
  },
  textInputWrapper: {
    height: 48,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    borderRadius: 24,
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
    color: "#DC3545"
  }
})

export default memo(CustomTextInput)
