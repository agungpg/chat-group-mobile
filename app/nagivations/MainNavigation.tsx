
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatStackNavigator from './ChatStack';
import FriendsStackNavigator from './FriendsStack';
import SettingsStackNavigator from './SettingsStack';
import { memo } from 'react';

const Tab = createBottomTabNavigator();

const MainNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name='Chat' component={ChatStackNavigator} />
    <Tab.Screen name='Friend' component={FriendsStackNavigator} />
    <Tab.Screen name='Settings' component={SettingsStackNavigator} />
  </Tab.Navigator>
)

export default memo(MainNavigator)
