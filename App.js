import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MainScreen from './screens/MainScreen';
import LoadingScreen from './screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' initialRouteName='LoadingScreen' >
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
          name='Login'
          component={LoginScreen}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: 'black',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name='Signup'
          component={SignupScreen}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: 'black',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name='Products'
          options={{
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
