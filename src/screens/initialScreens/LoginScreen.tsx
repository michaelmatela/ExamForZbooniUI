import React, {useState, useEffect} from 'react';
import { Alert, View, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import PillButton from '../../components/PillButton';
import { deleteSignupToken, saveToken } from '../../utils/secureStore';
import { login } from '../../api/api';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/authAction';

const LoginScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameValidation, setUsernameValidation] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    deleteSignupToken();
  }, []);

  const clearValidation = () => {
    setUsernameValidation('');
    setPasswordValidation('');
  }

  const logIn = async () => {
    setLoading(true);
    try {
console.log("login start");

      const response = await login(username, password);
      console.log(response);

      if (response.status == 400) {
        if ('email' in response.data) {
          setUsernameValidation(response.data.email[0]);
        }
        if ('password' in response.data) {
          setPasswordValidation(response.data.password[0]);
        }
      } else {
        dispatch(loginAction(response.token_type + ' ' + response.access_token));
        saveToken(response.access_token, response.token_type)
        navigation.navigate('HomeTabs');
      }
      
    } catch (error) {
      console.log(error);
      
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => { 
     clearValidation();
    if (username.trimEnd() == '') {
      setUsernameValidation('This field may not be blank');
    }

    if (password.trimEnd() == '') {
      setPasswordValidation('This field may not be blank');
    }

    
    if (usernameValidation == '' && passwordValidation == '') {
      logIn()
    }
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <View style={styles.textcontainer}>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Email Address"
                    placeholderTextColor="#848484"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {usernameValidation != '' ? <Text style={styles.validation}>{usernameValidation}</Text> : null }
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor="#848484"
                    autoCapitalize="none"
                    secureTextEntry={true} 
                    autoCorrect={false}
                />
                {passwordValidation != '' ? <Text style={styles.validation}>{passwordValidation}</Text> : null }
            </View>
            <View style={styles.buttoncontainer}>
                <PillButton
                    title="Log in"
                    backgroundColor="#101820"
                    borderColor="#101820"
                    borderWidth={0}
                    textColor="#FFFFFF"
                    onPress={() => handleLogin()}
                    />
            </View>   
        </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
  },

  textcontainer: {
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    gap: 5
  },

  buttoncontainer: {
    marginHorizontal: 20
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  input: {
    fontFamily: 'montserrat',
    height: 40,
    width: '90%',
    paddingHorizontal: 10,
    color: '#101820',
    marginBottom: 20,
    borderBottomColor: '#EBEBEB', 
    borderBottomWidth: 2
  },

  validation: {
    fontFamily: 'montserrat',
    fontSize: 16,
    paddingHorizontal: 10,
    color: 'red',
  }
});

export default LoginScreen;