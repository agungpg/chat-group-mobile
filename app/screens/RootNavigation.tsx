
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './home'
import ChatRoomScreen from './chat-room'

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
    return  <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
}

export default RootNavigation;