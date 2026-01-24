import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import SettingScreen from "@screens/setting"
import ProfileScreen from "@screens/profile"

export type SettingsStackParamList = {
  Settings: undefined;
  Profile: {userId: string};
}

export const SettingsRoutes =  {
  Settings: "Settings",
  Profile: "Profile",
} as const

type ScreenConfig<K extends keyof SettingsStackParamList> = {
  name: K;
  component: React.ComponentType<NativeStackScreenProps<SettingsStackParamList, K>>;
};


export const SettingsConfig = {
  initialRouteName: SettingsRoutes.Settings,
  screens: [
    { name: SettingsRoutes.Settings, component: SettingScreen },
    { name: SettingsRoutes.Profile, component: ProfileScreen },
  ] as ScreenConfig<keyof SettingsStackParamList>[],
} as const;



const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsStackNavigator = () => (
  <Stack.Navigator initialRouteName={SettingsConfig.initialRouteName}>
    {SettingsConfig.screens.map(({ name, component }) => (
      <Stack.Screen key={name} name={name} component={component} />
    ))}
  </Stack.Navigator>
)

export default SettingsStackNavigator;