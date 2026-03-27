module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@components': './app/components',
          '@screens': './app/screens',
          '@utils': './app/utils',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
