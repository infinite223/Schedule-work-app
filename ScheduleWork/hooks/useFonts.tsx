import * as Font from 'expo-font';

export const useFonts = async () =>
  await Font.loadAsync({
    "Custom-Font": require('../assets/fonts/customFont.ttf'),
});