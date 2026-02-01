import Button from "@components/Button"
import { useAuth } from "app/providers/AuthProvider"
import { memo } from "react"
import { Text, View } from "react-native"

const ChatListScreen = () => {
  const {logout} = useAuth()
  return <View>
    <Text>Chat List Screen</Text>
    <Button label="Logout" onPress={logout} />
  </View>
}

export default memo(ChatListScreen)