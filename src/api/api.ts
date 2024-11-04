import axiosInstance from './axiosInstance';
import { SIGNUP_CLIENT_ID, SIGNUP_CLIENT_SECRET, LOGIN_CLIENT_ID, LOGIN_CLIENT_SECRET } from '../utils/Config';
import * as Localization from 'expo-localization';
import { getSignupToken } from '../utils/secureStore';


export const preSignup = async () => {
    try {
      const data = {"client_id":SIGNUP_CLIENT_ID, "client_secret":SIGNUP_CLIENT_SECRET, "grant_type": "client_credentials" }
      
      const response = await axiosInstance.post('api/v1/oauth/token/', data); 
      
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      
      console.log(error.response.data);
      
      throw error;
    }
};

export const login = async (email: string, password: string) => {
    try {
      const data = {"client_id":LOGIN_CLIENT_ID, "client_secret":LOGIN_CLIENT_SECRET, "grant_type": "password", "username": email, "password": password }
      const response = await axiosInstance.post('api/v1/oauth/token/', data);
      console.log(response.data);
       
      return response.data;
    } catch (error) {
        console.error('Error posting data:', error.response.data);
      
        return error.response;
    }
};

export const signup = async (firstname: string, lastname: string, username: string, password: string, phonenumber: string) => {
    try {
      const locale = Localization.locale.split('-')[0];
      const data = {"first_name": firstname, "last_name": lastname, "phone_number": phonenumber, "email": username, "password": password, "language": locale};
      const token = await getSignupToken()
      const headers = {
        'Content-Type': 'application/json', 
        'Authorization': token, 
      };
      
      const response = await axiosInstance.post('api/v1/users/', data, {headers}); 
      return response.data;
    } catch (error) {
        
      console.error('Error posting data:', error.response);
      
      return error.response;
    }
};


