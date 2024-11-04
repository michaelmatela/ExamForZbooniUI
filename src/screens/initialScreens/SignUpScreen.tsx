import React, {useState, useEffect} from 'react';
import { Alert, View, Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import PillButton from '../../components/PillButton';
import CountryCodeModal from './CountryCodeModal';
import Checkbox from '../../components/CheckBox';
import {preSignup, signup}from '../../api/api';
import {saveSignupToken} from '../../utils/secureStore'

const SignUpScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDialCode, setSelectedDialCode] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usernameValidation, setUsernameValidation] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  const [lastnameValidation, setLastnameValidation] = useState('');
  const [firstnameValidation, setfirstnameValidation] = useState('');
  const [phonenumberValidation, setphoneNumberValidation] = useState('');
  const [checkValidation, setCheckValidation] = useState('');

  
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await preSignup();
        saveSignupToken(data.access_token, data.token_type);
      } catch (err) {
        showAlert
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const showAlert = (message: string) => {
    Alert.alert(
      'An error has occured, please try again later',
      message,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(), 
        },
      ],
      { cancelable: false }
    );
  };

  const signUp = async () => {
    setLoading(true);
    try {

      const response = await signup(firstname, lastname, username, password, phoneNumber);
      console.log(response);

      if (response.status == 400) {
        if ('first_name' in response.data) {
          setfirstnameValidation(response.data.first_name[0]);
        }
        if ('last_name' in response.data) {
          setLastnameValidation(response.data.last_name[0]);
        }
        if ('email' in response.data) {
          setUsernameValidation(response.data.email[0]);
        }
        if ('password' in response.data) {
          setPasswordValidation(response.data.password[0]);
        }
        if ('phone_number' in response.data) {
          setphoneNumberValidation(response.data.phone_number[0]);
        }
      } else {
        navigation.navigate('Login');
      }
      
      
      
      
    } catch (error) {
      console.log(error);
      
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearValidation = () => {
    setfirstnameValidation('');
    setLastnameValidation('');
    setUsernameValidation('');
    setPasswordValidation('');
    setphoneNumberValidation('');
    setCheckValidation('');
  }

  const handleCreateAccount = () => {
    clearValidation()
    if (firstname.trimEnd() == '') {
      setfirstnameValidation('This field may not be blank');
    }

    if (lastname.trimEnd() == '') {
      setLastnameValidation('This field may not be blank');
    }

    if (username.trimEnd() == '') {
      setUsernameValidation('This field may not be blank');
    }

    if (password.trimEnd() == '') {
      setPasswordValidation('This field may not be blank');
    }

    if (phoneNumber.trimEnd() == '') {
      setphoneNumberValidation('This field may not be blank');
    }

    if (!isChecked) {
      setCheckValidation('Please do not leave this unchecked');
    }

    if (isChecked && usernameValidation == '' && passwordValidation == '' &&
     firstnameValidation == '' && lastnameValidation == '' && phonenumberValidation == ''
    ) {
      
      signUp();
    }
  }

  const handleCheck = (checked: boolean) => {
    setIsChecked(checked);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSelectDialCode = (dialCode: string) => {
    setSelectedDialCode(dialCode);
    setPhoneNumber(dialCode + (phoneNumber !== null ? phoneNumber : ''));
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
        <CountryCodeModal visible={modalVisible} onClose={toggleModal} onSelect={handleSelectDialCode} />
        <View style={styles.container}>
            <View style={styles.textcontainer}>
            <TextInput
                    style={styles.input}
                    value={firstname}
                    onChangeText={setFirstName}
                    placeholder={t('firstName')}
                    placeholderTextColor="#848484"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {firstnameValidation != '' ? <Text style={styles.validation}>{firstnameValidation}</Text> : null }
                <TextInput
                    style={styles.input}
                    value={lastname}
                    onChangeText={setLastName}
                    placeholder={t('lastName')}
                    placeholderTextColor="#848484"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {lastnameValidation != '' ? <Text style={styles.validation}>{lastnameValidation}</Text> : null }
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder={t('emailAddress')}
                    placeholderTextColor="#848484"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {usernameValidation != '' ? <Text style={styles.validation}>{usernameValidation}</Text> : null }
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder={t('password')}
                    placeholderTextColor="#848484"
                    autoCapitalize="none"
                    secureTextEntry={true} 
                    autoCorrect={false}
                />
                {passwordValidation != '' ? <Text style={styles.validation}>{passwordValidation}</Text> : null }
            </View>
            <View style={styles.textcontainer}>
                <View style={styles.countryContainer}>
                <Text style={styles.countryTitle}>Country Code</Text>
                <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.countryClickable}>Select country code</Text>
                </TouchableOpacity>
                </View>
                <TextInput
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        placeholder={t('phoneNumber')}
                        placeholderTextColor="#848484"
                        autoCapitalize="none"
                        keyboardType="numeric"
                        autoCorrect={false}
                    />
                    {phonenumberValidation != '' ? <Text style={styles.validation}>{phonenumberValidation}</Text> : null }
            </View> 
            <View style={styles.checkboxContainer}>
              <Checkbox title={t('tnc')} onCheck={handleCheck} />
              {checkValidation != '' ? <Text style={styles.validation}>{checkValidation}</Text> : null }
            </View>
            
            <View style={styles.buttoncontainer}>
                <PillButton
                    title="Create Account"
                    backgroundColor="#101820"
                    borderColor="#101820"
                    borderWidth={0}
                    textColor="#FFFFFF"
                    onPress={() => handleCreateAccount()}
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

    countryContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        borderBottomColor: '#EBEBEB', 
        borderBottomWidth: 2
    },
  
    buttoncontainer: {
      marginHorizontal: 20
    },
  
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },

    countryTitle: {
        paddingHorizontal: 10,
        fontFamily: 'montserrat',
        fontSize: 16,
    },

    countryClickable: {
        paddingHorizontal: 10,
        fontFamily: 'montserrat',
        fontSize: 16,
        color: '#007AFF'
    },
  
    input: {
      fontFamily: 'montserrat',
      height: 40,
      fontSize: 16,
      width: '90%',
      paddingHorizontal: 10,
      color: '#101820',
      marginBottom: 20,
      borderBottomColor: '#EBEBEB', 
      borderBottomWidth: 2
    },

    checkboxContainer: {
      marginHorizontal: 48,
      marginVertical: 20
    },

    validation: {
      fontFamily: 'montserrat',
      fontSize: 16,
      paddingHorizontal: 10,
      color: 'red',
    }
  });

export default SignUpScreen;