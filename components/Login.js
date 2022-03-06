import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const Login = ({ apiUrl, setIsLogin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const onLoggedIn = (token) => {
    fetch(`${apiUrl}/private`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            setMessage(jsonRes.message);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const onSubmitHandler = async () => {
  //   try {
  //     const { data } = await axios.post(`${API_URL}/signup`, {
  //       userName,
  //       email,
  //       password,
  //     });
  //     setError(null);
  //   } catch (err) {
  //     setError(
  //       err.response.status === 409
  //         ? 'User already exist!'
  //         : 'Error while creating user. Try again!'
  //     );
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.form}>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder='Username'
            onChangeText={setUserName}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={setPassword}
          />
          {error && <Text style={styles.message}>{error}</Text>}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signButton}>
            <Text style={styles.text} onPress={() => setIsLogin(false)}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    paddingBottom: 35,
    color: 'black',
    textAlign: 'center',
  },
  form: {
    marginTop: 50,
    justifyContent: 'space-between',
    paddingBottom: '160%',
  },
  inputs: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    paddingTop: 10,
    marginTop: '5%',
    fontSize: 16,
    minHeight: 40,
    width: 250,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  signButton: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    backgroundColor: 'transparent',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#DCDCDC',
  },
  message: {
    fontSize: 16,
    color: 'red',
  },
});

export default Login;
