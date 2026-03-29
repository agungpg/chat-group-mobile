import Avatar from "@components/Avatar"
import Button from "@components/Button"
import MaterialIcons from "@react-native-vector-icons/material-icons"
import { COLORS } from "app/constants/token"
import { memo } from "react"
import { StyleSheet, View } from "react-native"

const AvatarForm = ({
  onUpload,
  isLoading,
  uri,
}: any) => {

  return (
    <View style={styles.container}>
      {uri ? <Avatar uri={uri} size={180} /> :
      <View style={{position: "relative", borderColor: COLORS.primary, borderWidth: 2, borderRadius: 8, width: 180, height: 180, display: "flex", alignItems: "center", justifyContent: "center", borderStyle: "dashed"}}>
        <MaterialIcons color={COLORS.primary} name={"person"} size={80} />
      </View>}
      {!isLoading && <Button 
        withIcon={{
          name: uri ? "edit" : "add",
          color: COLORS.surfaceContainerLowest,
          size: 24,
          position: "right"
        }}
        style={{ height: 52, width: 52, borderRadius: 12, position: "absolute", bottom: -10, right: 66}}
        backgroundColor={COLORS.primary}
        onPress={onUpload}
      />}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
    alignItems: "center",
    display: "flex"
  },
})

export default memo(AvatarForm)