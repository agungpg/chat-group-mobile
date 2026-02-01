import MaterialIcons, { MaterialIconsIconName } from "@react-native-vector-icons/material-icons";
import React, { memo } from "react";
import { View, StyleSheet } from "react-native"
import Typography from "./Typography";

interface InfoRowProps {
  label: string;
  value: string;
  icon?: {
    name: MaterialIconsIconName;
    size?: number;
    color?: string;
  }
}
const InfoRow = ({
  label,
  value,
  icon
}: InfoRowProps) => {
  return (
    <View style={styles.container}>
      {icon && <MaterialIcons size={30} color={"#363F47"}  {...icon} />}
      <View>
        <Typography variant="label">{label}</Typography>
        <Typography variant="body" style={styles.textValue}>{value}</Typography>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: "100%",
    paddingVertical: 4,
    paddingHorizontal: 8,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderRadius: 12,
  },
  textValue: {
    marginTop: -5
  }
})

export default memo(InfoRow)
