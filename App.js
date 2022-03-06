import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import Products from './components/Products';
import AuthScreen from './screens/AuthScreen.js';
import WelcomeScreen from './screens/WelcomeScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen
          name='Authorization'
          component={AuthScreen}
          options={{
            title: 'Authorization',
            headerTransparent: true,
            headerTintColor: 'black',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name='Main'
          component={WelcomeScreen}
          options={{
            headerTransparent: true,
            headerTintColor: 'transparent',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name='Products' component={Products} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
