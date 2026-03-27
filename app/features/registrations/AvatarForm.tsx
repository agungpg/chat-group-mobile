import Avatar from "@components/Avatar"
import Button from "@components/Button"
import { memo } from "react"
import { StyleSheet, View } from "react-native"
import Animated, {useSharedValue} from 'react-native-reanimated'

const AvatarForm = ({
  onUpload,
  isLoading,
  uri,
}: any) => {
  const opacity =  useSharedValue(0);

  console.log("opacity.value: ", opacity.value)
  return (
    <View style={styles.container}> 
      <View style={{position: "relative",}}>
        <Avatar size={210} uri={uri || ""} />
      </View>
       <Button style={{width: 200}} isLoading={isLoading} label="edit" onPress={onUpload} />
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