import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "app/screens/login"
import RegistrationScreen from "app/screens/registration"
import ProfileSetupScreen from "app/screens/profile-setup"

export type AuthParamList = {
  Login: undefined;
  Registration: undefined;
  ProfileSetup: { groupId: string };
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
  screenOptions: {
    headerShown: false,
  },
  screens: [
    { name: AuthRoutes.Login, component: LoginScreen },
    { name: AuthRoutes.Registration, component: RegistrationScreen },
    { name: AuthRoutes.ProfileSetup, component: ProfileSetupScreen },
  ] as ScreenConfig<keyof AuthParamList>[],
} as const;



const Stack = createNativeStackNavigator<AuthParamList>();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName={AuthConfig.initialRouteName} screenOptions={AuthConfig.screenOptions}>
    {AuthConfig.screens.map(({ name, component,  }) => (
      <Stack.Screen  key={name} name={name} component={component} />
    ))}
  </Stack.Navigator>
)

export default AuthNavigator;
