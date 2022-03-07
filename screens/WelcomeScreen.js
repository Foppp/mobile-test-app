import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import bgImg from '../assets/background.png';

const MainScreen = ({navigation}) => {
  return (
    <ImageBackground source={bgImg} style={styles.image}>
      <View style={styles.container}>
        <Text>Welcome to the App</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoadingScreen')}>
            <Text style={styles.text}>Get Started</Text>
          </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#DCDCDC',
  },
  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
});
