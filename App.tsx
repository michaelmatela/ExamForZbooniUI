import 'intl-pluralrules';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { I18nextProvider } from 'react-i18next';
import i18next from './src/i18n';
import useFonts from './src/useFonts';
import WelcomeScreen from './src/screens/initialScreens/WelcomeScreen'; 
import LoginScreen from './src/screens/initialScreens/LoginScreen';
import SignupScreen from './src/screens/initialScreens/SignUpScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateOrderScreen from './src/screens/mainScreens/CreateOrderScreen';
import NotificationScreen from './src/screens/mainScreens/NotificationScreen';
import OrderScreen from './src/screens/mainScreens/OrderScreen';
import StoreScreen from './src/screens/mainScreens/StoreScreen';
import MoreScreen from './src/screens/mainScreens/MoreScreen';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { useTranslation } from 'react-i18next';
import CreateIcon from './assets/images/create.png';
import NotificationIcon from './assets/images/notification.png';
import OrderIcon from './assets/images/order.png';
import StoreIcon from './assets/images/store.png';
import MoreIcon from './assets/images/more.png';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CreateOrderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CreateOrderHeader" 
        component={CreateOrderScreen} 
        options={{ title: 'New invoice' }} // Different from tab label
      />
    </Stack.Navigator>
  );
};

interface TabLabelProps {
  label: string;
}

const TabLabel: React.FC<TabLabelProps> = ({ label }) => (
  <View>
    <Text style={styles.tabLabel}>{label}</Text>
  </View>
);


const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;

          // Choose the icon based on the route name
          if (route.name === 'CreateOrder') {
            icon = <Image source={CreateIcon} style={{ width: 20, height: 20, tintColor: focused ? '#60F79D' : '#B2B2B7' }} resizeMode="contain" />;
          } else if (route.name === 'Notification') {
            icon = <Image source={NotificationIcon} style={{ width: 20, height: 20, tintColor: focused ? '#60F79D' : '#B2B2B7' }} resizeMode="contain" />;
          } else if (route.name === 'Order') {
            icon = <Image source={OrderIcon} style={{ width: 20, height: 20, tintColor: focused ? '#60F79D' : '#B2B2B7' }} resizeMode="contain" />;
          } else if (route.name === 'Store') {
            icon = <Image source={StoreIcon} style={{ width: 20, height: 20, tintColor: focused ? '#60F79D' : '#B2B2B7' }} resizeMode="contain" />;
          } else if (route.name === 'More') {
            icon = <Image source={MoreIcon} style={{ width: 20, height: 20, tintColor: focused ? '#60F79D' : '#B2B2B7' }}  resizeMode="contain"/>;
          }

          return icon;
        },

        
        tabBarActiveTintColor: '#60F79D',
        tabBarInactiveTintColor: '#B2B2B7',
        tabBarStyle: { backgroundColor: '#101820', borderTopWidth: 0 },
      })}
    >
      <Tab.Screen name="CreateOrder" component={CreateOrderStack} options={{ 
          tabBarLabel: () => <TabLabel label="NOTIFICATIONS" />, 
          headerShown: false, 
          
        }}  />
      <Tab.Screen name="Notification" component={NotificationScreen} options={{ 
          tabBarLabel: () => <TabLabel label="NOTIFICATIONS" /> }} />
      <Tab.Screen name="Order" component={OrderScreen} options={{ 
          tabBarLabel: () => <TabLabel label="ORDER" /> }} />
      <Tab.Screen name="Store" component={StoreScreen} options={{ 
          tabBarLabel: () => <TabLabel label="STORE" /> }} />
      <Tab.Screen name="More" component={MoreScreen} options={{ 
          tabBarLabel: () => <TabLabel label="MORE" /> }} />
    </Tab.Navigator>
  );
};



const App = () => {
  const fontsLoaded = useFonts();
  const { t } = useTranslation();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen options={{headerShown: false, headerBackTitle: '',} } name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" options={{ title: t('welcomeBack'), headerBackTitleVisible: false, headerLeft: () => null, headerTintColor: 'black',}} component={LoginScreen} />
          <Stack.Screen name="Signup" options={{ title: t('createAnAccount'), headerBackTitleVisible: false, headerTintColor: 'black',}} component={SignupScreen} />
          <Stack.Screen 
            name="HomeTabs" 
            options={{ headerShown: false }} 
            component={HomeTabs} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
    </Provider>
    
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 8, 
    color: 'white', 
    fontFamily: 'montserrat'
  },
});

export default App;