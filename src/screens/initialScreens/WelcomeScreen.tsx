// src/screens/HomeScreen.tsx
import React, {useEffect} from 'react';
import { Platform, StatusBar, View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import PillButton from '../../components/PillButton';
import { deleteSignupToken, getToken } from '../../utils/secureStore';
import { loginAction } from '../../store/authAction';

const WelcomeScreen = ({ navigation }: any) => {
  const { t } = useTranslation();

  // Set the status bar style
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('light-content'); // Set text color to light
      StatusBar.setBackgroundColor('black'); // Set the status bar background color
      return () => {
        StatusBar.setBarStyle('dark-content'); // Reset on unmount if needed
        StatusBar.setBackgroundColor('white'); // Reset on unmount if needed
      };
    }
    deleteSignupToken();
    const loadData = async () => {
    const token = await getToken();

      if (token != '' && token != null) {
        console.log(token);
        loginAction(token);
        navigation.navigate('HomeTabs');
      }
   }
   loadData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.subtitle}>Say hello to cCommerce</Text>
        <View style={styles.buttonContainer}>
          <PillButton
          title="Log in"
          backgroundColor="#101820"
          borderColor="#FFFFFF"
          borderWidth={1}
          textColor="#FFFFFF"
          onPress={() => navigation.navigate('Login')}
        />
        <PillButton
          title="Create a free account"
          backgroundColor="#FFFFFF"
          borderColor="#FFFFFF"
          borderWidth={0}
          textColor="#101820"
          onPress={() => navigation.navigate('Signup')}
        />
        </View>
        
      </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#101820",
  },
  
  container: {
    
    flexDirection: 'column',
    justifyContent: 'flex-start', // Align items at the top
    alignItems: 'center',
    height: '100%',
    backgroundColor: "#101820",
    padding: 34,
  },

  logo: {
    marginTop: 151,
    width: 204.96,
    height: 40.66,
  },

  subtitle: {
    fontFamily: 'montserrat',
    marginTop: 10,
    fontSize: 18,
    color: '#FFFFFF'
  },

  buttonContainer: {
    flex:1,
    marginTop: 330,
    width: '100%',
    gap: 17 ,
  }
});

export default WelcomeScreen;