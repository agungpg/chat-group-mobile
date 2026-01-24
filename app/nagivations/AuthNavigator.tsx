import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@screens/login"
import RegistrationScreen from "@screens/registration"
import ProfileSetupScreen from "@screens/profile-setup"

export type AuthParamList = {
  Login: undefined;
  Registration: { roomId: string; chatId?: string };
  ProfileSetup: { groupId: string };
  Profile: { userId: string };
}

export const AuthRoutes =  {
  Login: "Login",
  Registration: "Registration",
  ProfileSetup: "ProfileSetup",
} as const

type ScreenConfig<K extends keyof AuthParamList> = {
  name: K;
  component: React.ComponentType<NativeStackScreenProps<AuthParamList, K>>;
};


export const AuthConfig = {
  initialRouteName: AuthRoutes.Login,
  screens: [
    { name: AuthRoutes.Login, component: LoginScreen },
    { name: AuthRoutes.Registration, component: RegistrationScreen },
    { name: AuthRoutes.ProfileSetup, component: ProfileSetupScreen },
  ] as ScreenConfig<keyof AuthParamList>[],
} as const;



const Stack = createNativeStackNavigator<AuthParamList>();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName={AuthConfig.initialRouteName}>
    {AuthConfig.screens.map(({ name, component }) => (
      <Stack.Screen key={name} name={name} component={component} />
    ))}
  </Stack.Navigator>
)

export default AuthNavigator;
