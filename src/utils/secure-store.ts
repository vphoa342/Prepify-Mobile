// secureStore.js
import * as SecureStore from "expo-secure-store";

// Save token
export const saveValue = async (key: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(key, value);
};

// Retrieve token
export const getValue = async (key: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(key);
};

// Delete token
export const removeValue = async (key: string): Promise<void> => {
    await SecureStore.deleteItemAsync(key);
};
