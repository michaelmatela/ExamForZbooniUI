import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import PillButton from '../../components/PillButton';
import { View, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native';

const OrderScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
        <Text>Order Page</Text>
    </View>
    
  );
};



export default OrderScreen;