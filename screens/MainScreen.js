import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import bgImg from '../assets/background.png';

const apiUrl = 'http://10.0.0.237:5000';

const MainScreen = ({ navigation }) => {
  const [email, setEmail] = useState('loading');

  const getAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const { data } = await axios.get(`${apiUrl}/private`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  const logout = () => {
    AsyncStorage.removeItem('token').then(() => {
      navigation.replace('Authorization');
    });
  };

  return (
    <ImageBackground source={bgImg} style={styles.image}>
      <Text style={{ fontSize: 18 }}>your email is {email}</Text>
      <TouchableOpacity
        style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
        onPress={logout}
      >
        <Text>LogOut</Text>
      </TouchableOpacity>
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

export default MainScreen;
