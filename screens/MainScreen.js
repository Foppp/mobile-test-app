import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity, View, TextInput, FlatList, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import bgImg from '../assets/background.png';

const apiUrl = 'https://mobile-test-task.herokuapp.com';

const MainScreen = ({ navigation }) => {
  const [isloggedin, setLogged] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const getAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const { data } = await axios.get(`${apiUrl}/private`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setLogged(true);
    } catch (err) {
      console.log(err);
      setLogged(false);
      navigation.replace('Login');
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/products`);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };
    if (isloggedin) getProducts();
  }, [isloggedin]);

  const logout = () => {
    AsyncStorage.removeItem('token').then(() => {
      navigation.replace('Login');
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemWrapperStyle}>
        <Image style={styles.itemImageStyle} source={{ uri: item.img }} />
        <View style={styles.contentWrapperStyle}>
          <Text style={styles.txtNameStyle}>{item.name}</Text>
          <Text style={styles.txtDescStyle}>{item.description}</Text>
          <Text style={styles.txtPriceStyle}>{item.price} $</Text>
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return products.length === 0 ? (
      <View style={styles.loaderStyle}>
        <Text>Loading data...</Text>
        <ActivityIndicator
          style={styles.activityInd}
          size='large'
          color='#aaa'
        />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <ImageBackground source={bgImg} style={styles.image}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.container}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
      <TouchableOpacity
        style={[styles.logoutButton, styles.elevation]}
        onPress={logout}
      >
        <Text>LogOut</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    width: '95%',
  },
  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  itemWrapperStyle: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#ddd',
    backgroundColor: '#DCDCDC',
  },
  activityInd: {
    marginTop: 30,
  },
  itemImageStyle: {
    width: 140,
    height: 80,
    margin: 5,
  },
  contentWrapperStyle: {
    justifyContent: 'space-between',
    width: '100%',
  },
  txtNameStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  txtDescStyle: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
  txtPriceStyle: {
    fontSize: 20,
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
    marginRight: 20,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  productImage: {
    width: '90%',
    height: 200,
    resizeMode: 'cover',
  },
  logoutButton: {
    width: '70%',
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: 40,
    marginLeft: 80,
    marginRight: 80,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#DCDCDC',
  },
  elevation: {
    elevation: 30,
    shadowColor: '#191919',
  },
});

export default MainScreen;
