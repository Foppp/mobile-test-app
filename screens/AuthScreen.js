import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import bgImg from '../assets/background.png';
import Login from '../components/Login';
import Signup from '../components/Signup';

const apiUrl = 'http://10.0.0.196:5000';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  const onChangeHandler = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  return (
    <ImageBackground source={bgImg} style={styles.image}>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} apiUrl={apiUrl}/>
      ) : (
        <Signup setIsLogin={setIsLogin} apiUrl={apiUrl} />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});

export default AuthScreen;
