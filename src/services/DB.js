import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (anahtar,value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(anahtar, jsonValue);
  } catch (e) {
    console.error("storeData error:", e);
  }
};

export const getData = async (anahtar) => {
  try {
    const jsonValue = await AsyncStorage.getItem(anahtar);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("getData error:", e);
    return [];
  }
};