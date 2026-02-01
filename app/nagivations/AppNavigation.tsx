import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./MainNavigation";
import AuthNavigation from "./AuthNavigation";
import { useAuth } from "app/providers/AuthProvider";

const AppNavigator = () => {
  const { isLogedIn } = useAuth();
  // if (loading) return <Splash />;

  return (
    <NavigationContainer>
      {isLogedIn ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigator;