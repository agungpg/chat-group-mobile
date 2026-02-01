import { createMMKV } from 'react-native-mmkv';

// Shared MMKV instance so hooks and utilities read/write the same store.
export const storage = createMMKV();
