import React, {useState} from 'react';
import styled from 'styled-components';
import {Text, View, Image, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

import {
  LoginButton,
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {useMutation} from '@apollo/react-hooks';
import {CREATE_ACCOUNT} from '../../screens/Auth/AuthQueries';
// import {Icon} from 'react-native-elements';

const LoginBtn = styled.TouchableOpacity`
  border-radius: 20px;
`;

export default () => {
  const [userInfo, setUserInfo] = useState({});
  const navigation = useNavigation();
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT);
  const handleSignUpMut = async ({first_name, last_name, email}) => {
    const createResult = await createAccountMutation({
      variables: {
        username: email,
        email: email,
        firstName: first_name,
        lastName: last_name,
      },
    });
    const {createAccount} = createResult.data || null;
    return createAccount;
  };
  const getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string:
          'id, email, name, first_name, last_name, picture.type(large){url}',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      async (error, result) => {
        if (error) {
          console.log('Login Info has an error: ', error);
        }
        setUserInfo(result);
        const createAccount = await handleSignUpMut(result);
        if (createAccount) {
          Alert.alert('Аккаунт создан', 'Войдите сейчас');
          navigation.navigate('Login', result.email);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  const handleFacebookLogin = async () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  return (
    <>
      <LoginBtn onPress={() => handleFacebookLogin()}>
        <Icon
          iconStyle={{borderRadius: 20}}
          size={45}
          name="logo-facebook"
          type="ionicon"
          color="#3b5998"
        />
      </LoginBtn>
    </>
  );
};
