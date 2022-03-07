import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import Products from './components/Products';
import AuthScreen from './screens/AuthScreen.js';
import WelcomeScreen from './screens/WelcomeScreen';
import MainScreen from './screens/MainScreen';
import LoadingScreen from './screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isloggedin, setLogged] = useState(null);

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  };

  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' initialRouteName='Welcome'>
        <Stack.Screen
          name='Welcome'
          component={WelcomeScreen}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: 'transparent',
          }}
        />
        <Stack.Screen
          name='LoadingScreen'
          options={{
            title: '',
            headerBackVisible: false,
            headerTransparent: true,
            headerTintColor: 'transparent',
          }}
          component={LoadingScreen}
        />
        <Stack.Screen
          name='Authorization'
          component={AuthScreen}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: 'black',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name='Main'
          options={{
            title: 'Main',
            headerTransparent: true,
            headerTintColor: 'black',
            headerTitleAlign: 'center',
          }}
          component={MainScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
