import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

export const requestPermission = async () => {
  try {
    if(Platform.OS === 'android' && Platform.Version >= 33) {
      const permissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      )
      if(permissionStatus === PermissionsAndroid.RESULTS.GRANTED) return true;
    }
    return false
  } catch (error) {
    return false
  }

}

export const getFcmToken = async () =>  {
  const hasPermission = await requestPermission();
  if(!hasPermission) return;

  await messaging().registerDeviceForRemoteMessages();

  const token = await messaging().getToken();
  if (token) {
      console.log("Your Firebase Token is:", token);
      // It is recommended to send this token to your backend server and store it
      // associated with the user's account for sending targeted notifications.
      // Example: await postToApi('/users/1234/tokens', { token });
  } else {
    console.log("Failed to get FCM token: No token received");
  }
  return token;
}
