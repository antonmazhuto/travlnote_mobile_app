import AsyncStorage from '@react-native-community/async-storage';

export const storageGetItem = async (key) => {
  try {
    let result = await AsyncStorage.getItem(key);
    return JSON.parse(result);
  } catch (e) {
    throw e;
  }
};

export const storageSetItem = async (key, value) => {
  try {
    const item = JSON.stringify(value);

    return await AsyncStorage.setItem(key, item);
  } catch (e) {
    throw e;
  }
};
