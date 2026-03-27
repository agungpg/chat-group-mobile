import { NativeModules, Platform } from 'react-native';

const API_PORT = 8080;
const androidFingerprint =
  Platform.OS === 'android'
    ? ((Platform.constants as { Fingerprint?: string }).Fingerprint ?? '')
    : '';
const androidModel =
  Platform.OS === 'android' ? ((Platform.constants as { Model?: string }).Model ?? '') : '';
const isAndroidEmulator =
  Platform.OS === 'android' &&
  /generic|emulator|sdk|x86|simulator/i.test(`${androidFingerprint} ${androidModel}`);
const fallbackHost = Platform.select({
  android: isAndroidEmulator ? '10.0.2.2' : 'localhost',
  ios: '127.0.0.1',
  default: 'localhost',
}) ?? 'localhost';
const scriptURL = NativeModules.SourceCode?.scriptURL;
const metroHost = scriptURL?.match(/^https?:\/\/([^:/]+)/)?.[1];
const isLocalMetroHost = metroHost === 'localhost' || metroHost === '127.0.0.1';
const API_HOST = metroHost && !isLocalMetroHost ? metroHost : fallbackHost;

// Physical Android devices can use localhost with adb reverse; emulators use 10.0.2.2.
export const API_BASE_URL = `http://${API_HOST}:${API_PORT}`;
