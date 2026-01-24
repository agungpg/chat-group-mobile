import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";

const AppNavigator = ({ isLogin, loading }: { isLogin: boolean; loading: boolean}) => {
  // if (loading) return <Splash />;

  return (
    <NavigationContainer>
      {isLogin ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;