import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bgImg from '../assets/background.png';

const apiUrl = 'https://mobile-test-task.herokuapp.com';


const loginValidationSchema = yup.object().shape({
  userName: yup.string().required('Username is Required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .mixed()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const SignupScreen = ({ setIsLogin, navigation }) => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const onSubmitHandler = async ({ userName, email, password }) => {
    try {
      const { data } = await axios.post(`${apiUrl}/signup`, {
        userName,
        email,
        password,
      });
      await AsyncStorage.setItem('token', data.token);
      setError(null);
      navigation.replace('LoadingScreen');
    } catch (err) {
      setError(
        err.response.status === 409
          ? 'User already exist!'
          : 'Error while creating user. Try again!'
      );
    }
  };

  return (
    <ImageBackground source={bgImg} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.heading}>Sign up</Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values) => onSubmitHandler(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <View style={styles.form}>
              <View style={styles.inputs}>
                <TextInput
                  name='userName'
                  style={styles.input}
                  placeholder='Username'
                  onChangeText={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                  value={values.userName}
                />
                {errors.userName && touched.userName && (
                  <Text style={styles.message}>{errors.userName}</Text>
                )}
                <TextInput
                  name='email'
                  style={styles.input}
                  placeholder='Email'
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={styles.message}>{errors.email}</Text>
                )}
                <TextInput
                  name='password'
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder='Password'
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <Text style={styles.message}>{errors.password}</Text>
                )}
                <TextInput
                  name='confirmPassword'
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder='Confirm Password'
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.message}>{errors.confirmPassword}</Text>
                )}
                {error && <Text style={styles.message}>{error}</Text>}
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <Text style={isValid ? styles.text : styles.textDisabled}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.loginButton}>
                    <Text
                      style={styles.text}
                      onPress={() => navigation.replace('Login')}
                    >
                      Have account?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
        <StatusBar style='auto' />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
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
    marginTop: 110,
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
  loginButton: {
    alignItems: 'center',
    marginTop: 40,
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    backgroundColor: 'transparent',
  },
  button: {
    alignItems: 'center',
    marginTop: 40,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#DCDCDC',
  },
  textDisabled: {
    color: '#FFFAF0',
    fontSize: 20,
  },
  message: {
    fontSize: 16,
    color: 'red',
  },
});

export default SignupScreen;
