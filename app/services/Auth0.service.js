import Auth0 from 'react-native-auth0';
import {AUTH_CLIENT_ID, AUTH_DOMAIN} from '@env';

const auth0 = new Auth0({
  clientId: AUTH_CLIENT_ID,
  domain: AUTH_DOMAIN,
});

const login = () => {
  return auth0.webAuth
    .authorize({
      scope: 'openid profile email',
    })
    .then(credentials => {
      return credentials.accessToken;
    })
    .catch(e => {
      console.log('Login fail', e);
      return null;
    });
};

const logout = () => {
  return auth0.webAuth
    .clearSession({})
    .then(() => {
      return true;
    })
    .catch(e => {
      console.log('Log out cancelled', e);
      return false;
    });
};

const getUserInfo = token => {
  return auth0.auth.userInfo({token}).catch(e => {
    console.log('Get userInfo error', e);
    return null;
  });
};

const Auth0Service = {
  login,
  logout,
  getUserInfo,
};

export default Auth0Service;
