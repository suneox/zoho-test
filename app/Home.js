/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import SaleIQService from './services/SaleIQ.service';
import Auth0Service from './services/Auth0.service';

const Home = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = async () => {
    const accessToken = await Auth0Service.login();
    if (accessToken) {
      setToken(accessToken);
      Alert.alert('AccessToken: ', accessToken);
    }
  };

  const logout = async () => {
    const status = await Auth0Service.logout();
    if (status) {
      SaleIQService.logout();
      setToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    if (token) {
      Auth0Service.getUserInfo(token).then(setUser);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      SaleIQService.login(user);
    }
  }, [user]);

  const loggedIn = !!token;

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Auth0Sample - Login </Text>
      <Text>You are{loggedIn ? ' ' : ' not '}logged in . </Text>
      <Button
        onPress={loggedIn ? logout : login}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
      {loggedIn && (
        <Button
          onPress={SaleIQService.openChat}
          title={'CHAT NOW'}
          style={{marginTop: 20}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default Home;
