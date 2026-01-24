import { memo, useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { getFcmToken } from "../../utils/firebase"

const HomeScreen = ({ navigation }) => {
    const [name, setName] = useState("")
    const handleGoToChatRoom = () => {
        navigation.navigate("ChatRoom", {
            name: name
        })
    }

    const generateToken = async () => {
      getFcmToken()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <TextInput
                placeholder="Please enter your name..."
                value={name}
                onChangeText={setName}
            />
            <Button title="Generate Token" onPress={generateToken}></Button>
            <Button title="Go to Chat Room" onPress={handleGoToChatRoom} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // fill full screen
        width: "100%",
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
    },
    title: {
        fontSize: 50,
    },
})

export default memo(HomeScreen)
