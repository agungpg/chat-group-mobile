import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import FriendListScreen from "@screens/friend-list"
import FriendRequestScreen from "@screens/friend-request"

export type FriendStackParamList = {
  FriendList: undefined;
  FriendRequest: undefined;
}

export const FriendRoutes =  {
  FriendList: "FriendList",
  FriendRequest: "FriendRequest",
} as const

type ScreenConfig<K extends keyof FriendStackParamList> = {
  name: K;
  component: React.ComponentType<NativeStackScreenProps<FriendStackParamList, K>>;
};


export const FriendStackConfig = {
  initialRouteName: FriendRoutes.FriendList,
  screenOptions: {
    headerShown: false,
  },
  screens: [
    { name: FriendRoutes.FriendList, component: FriendListScreen },
    { name: FriendRoutes.FriendRequest, component: FriendRequestScreen },
  ] as ScreenConfig<keyof FriendStackParamList>[],
} as const;


const Stack = createNativeStackNavigator<FriendStackParamList>();

const FriendsStackNavigator = () => (
  <Stack.Navigator screenOptions={FriendStackConfig.screenOptions} initialRouteName={FriendStackConfig.initialRouteName}>
    {FriendStackConfig.screens.map(({ name, component }) => (
      <Stack.Screen key={name} name={name} component={component} />
    ))}
  </Stack.Navigator>
)

export default FriendsStackNavigator;