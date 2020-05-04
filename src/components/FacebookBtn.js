import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export default () => {
  const [userInfo, setUserInfo] = useState({});
  const getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name, first_name, last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('Login Info has an error: ', error);
        }
        setUserInfo(result);
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  return (
    <>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          }
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }}
        onLogoutFinished={() => setUserInfo({})}
      />
      {userInfo.name && <Text>Logged in as{userInfo.name}</Text>}
    </>
  );
};
