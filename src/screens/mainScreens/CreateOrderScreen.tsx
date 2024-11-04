import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import PillButton from '../../components/PillButton';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';

const CreateOrderScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
         <View style={styles.container}>
            <Image source={require('../../../assets/images/new_invoice_logo.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title} >Create a new order</Text>
         <Text  style={styles.description}>Share with your customer for easy checkout</Text>
         <PillButton
                    title="Create order"
                    backgroundColor="#101820"
                    borderColor="#101820"
                    borderWidth={0}
                    textColor="#FFFFFF"
                    onPress={() => navigation.navigate('HomeTabs')}
                    />
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
      justifyContent: 'flex-start', // Align items at the top
      alignItems: 'center',
      height: '100%',
      padding: 34,
    },
  
    logo: {
      marginTop: 80,
      width: 214,
      height: 214,
    },

    title: {
        marginTop: 50,
        fontFamily: 'montserrat',
        fontSize: 18,
        color: '#131313'
    },

    description: {
        fontFamily: 'montserrat',
        fontSize: 14,
        color: '#848484',
        marginBottom: 20
    }
  
    
  });
  

export default CreateOrderScreen;