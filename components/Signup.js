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
import { Formik } from 'formik';
import * as yup from 'yup';

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
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});

const Signup = ({ apiUrl, setIsLogin }) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const onSubmitHandler = async () => {
    try {
      const { data } = await axios.post(`${apiUrl}/signup`, {
        userName,
        email,
        password,
      });
      setError(null);
    } catch (err) {
      setError(
        err.response.status === 409
          ? 'User already exist!'
          : 'Error while creating user. Try again!'
      );
    }
  };

  return (
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
        onSubmit={(values) => console.log(values)}
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
              <TextInput
                name='password'
                style={styles.input}
                secureTextEntry={true}
                placeholder='Password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <TextInput
                name='confirmPassword'
                style={styles.input}
                secureTextEntry={true}
                placeholder='Confirm Password'
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
              {error && <Text style={styles.message}>{error}</Text>}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.text}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.text} onPress={() => setIsLogin(true)}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
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
    marginTop: 90,
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

export default Signup;
