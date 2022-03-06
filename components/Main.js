import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Main = ({ navigation }) => {
  return (
    <View>
      <Text>Main</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Products')}>
        <Text>Products</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
