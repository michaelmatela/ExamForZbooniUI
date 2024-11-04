import * as SecureStore from 'expo-secure-store';

export const saveToken = async (token: string, tokenType: string) => {
  try {
    await SecureStore.setItemAsync('userToken', tokenType + ' ' +token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync('userToken');
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync('userToken');
  } catch (error) {
    console.error('Error deleting token:', error);
  }
};

export const saveRefreshToken = async (token: string, tokenType: string) => {
    try {
      await SecureStore.setItemAsync('refreshToken', tokenType + ' ' +token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };
  
  export const getRefreshToken = async () => {
    try {
      return await SecureStore.getItemAsync('refreshToken');
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };
  
  export const deleteRefreshToken = async () => {
    try {
      await SecureStore.deleteItemAsync('refreshToken');
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  };

export const saveSignupToken = async (token: string, tokenType: string) => {
    try {
      await SecureStore.setItemAsync('signupToken', tokenType + ' ' +token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };
  
  export const getSignupToken = async () => {
    try {
      return await SecureStore.getItemAsync('signupToken');
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };
  
  export const deleteSignupToken = async () => {
    try {
      await SecureStore.deleteItemAsync('signupToken');
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  };