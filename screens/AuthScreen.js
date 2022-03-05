import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const AuthScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.form}>
        <View style={styles.inputs}>
          <TextInput style={styles.input} placeholder='Username' />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder='Password'
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '35%',
    color: 'black',
    textAlign: 'center',
  },
  form: {
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
  button: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#DCDCDC',
  },
});

export default AuthScreen;
