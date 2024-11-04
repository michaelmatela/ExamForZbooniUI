import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import PillButton from '../../components/PillButton';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { deleteToken, deleteRefreshToken } from '../../utils/secureStore';
import { CommonActions } from '@react-navigation/native';
import { logoutAction } from '../../store/authAction';

const MoreScreen = ({ navigation }: any) => {
  const { t } = useTranslation();

  const handleLogout = async () => {
     await deleteToken();
     await deleteRefreshToken();
     logoutAction()
     navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        })
      );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
         <View style={styles.container}>
         <PillButton
                    title="Log out"
                    backgroundColor="#101820"
                    borderColor="#101820"
                    borderWidth={0}
                    textColor="#FFFFFF"
                    onPress={() => handleLogout()}
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


  
    
  });
  

export default MoreScreen;