import { memo } from "react"
import { StyleSheet, Text, View } from "react-native"

const ChatRoomScreen = ({route}) => {

  const { name } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chat Room</Text>
            <Text style={styles.title}>Hi {name ?? ""}!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // fill full screen
        width: "100%",
        backgroundColor: "red",
    },
    title: {
        marginTop: 200,
        fontSize: 50,
    },
})

export default memo(ChatRoomScreen)
