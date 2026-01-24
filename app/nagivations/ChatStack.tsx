import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatListScreen from "@screens/chat-list"
import ChatRoomScreen from "@screens/chat-room"
import GroupInfoScreen from "@screens/group-info"
import ProfileScreen from "@screens/profile"

export type ChatStackParamList = {
  ChatList: undefined;
  ChatRoom: { roomId: string; chatId?: string };
  GroupInfo: { groupId: string };
  Profile: { userId: string };
}

export const ChatRoutes =  {
  ChatList: "ChatList",
  ChatRoom: "ChatRoom",
  GroupInfo: "GroupInfo",
  Profile: "Profile",
} as const

type ScreenConfig<K extends keyof ChatStackParamList> = {
  name: K;
  component: React.ComponentType<NativeStackScreenProps<ChatStackParamList, K>>;
};


export const ChatStackConfig = {
  initialRouteName: ChatRoutes.ChatList,
  screens: [
    { name: ChatRoutes.ChatList, component: ChatListScreen },
    { name: ChatRoutes.ChatRoom, component: ChatRoomScreen },
    { name: ChatRoutes.GroupInfo, component: GroupInfoScreen },
    { name: ChatRoutes.Profile, component: ProfileScreen },
  ] as ScreenConfig<keyof ChatStackParamList>[],
} as const;



const Stack = createNativeStackNavigator<ChatStackParamList>();

const ChatStackNavigator = () => (
  <Stack.Navigator initialRouteName={ChatStackConfig.initialRouteName}>
    {ChatStackConfig.screens.map(({ name, component }) => (
      <Stack.Screen key={name} name={name} component={component} />
    ))}
  </Stack.Navigator>
)

export default ChatStackNavigator;
