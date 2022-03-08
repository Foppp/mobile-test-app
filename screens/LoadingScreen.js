import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Text, View, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bgImg from '../assets/background.png';

const LoadingScreen = ({ navigation }) => {

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.replace('Products');
    } else {
      navigation.replace('Login');
    }
  };

  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <ImageBackground source={bgImg} style={styles.image}>
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});

export default LoadingScreen;
