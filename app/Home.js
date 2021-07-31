/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import Auth0 from 'react-native-auth0';
import SaleIQService from './SaleIQ.service';
import {AUTH_CLIENT_ID, AUTH_DOMAIN} from '@env';

const auth0 = new Auth0({
  clientId: AUTH_CLIENT_ID,
  domain: AUTH_DOMAIN,
});

const Home = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
      })
      .then(credentials => {
        Alert.alert('AccessToken: ' + credentials.accessToken);
        setToken(credentials.accessToken);
      })
      .catch(error => console.log(error));
  };

  const logout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        SaleIQService.logout();
        Alert.alert('Logged out!');
        setToken(null);
      })
      .catch(error => {
        console.log('Log out cancelled');
      });
  };

  useEffect(() => {
    if (token) {
      auth0.auth.userInfo({token}).then(setUser).catch(console.log);
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
          style={{marginTop: 10}}
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
