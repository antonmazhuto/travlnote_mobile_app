import React, {useState} from 'react';
import {Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from 'styled-components';
import {AuthInput} from '../../components/Auth/AuthInput';
import {AuthButtonLight} from '../../components/buttons/AuthButtonLight';
import {useInput} from '../../hooks/useInput';
import {useMutation} from '@apollo/react-hooks';
import {LOG_IN} from './AuthQueries';
import constants from '../../constants';
import FacebookBtn from '../../components/buttons/FacebookBtn';

const ImageBackground = styled.ImageBackground`
  justify-content: space-around;
  align-items: center;
  flex: 1;
  padding: 0 30px;
`;

const LoginBlock = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.white};
  opacity: 0.83;
  padding: 27px 23.5px 24px;
  border-radius: 10px;
  justify-content: space-around;
  height: ${constants.height / 2}px;
`;
const LoginBlockLabel = styled.Text`
  align-content: center;
  text-align: center;
  font-size: 22px;
  font-weight: 500;
`;
const AppTitle = styled.Text`
  font-family: 'Josefin Sans';
  font-size: 56px;
`;
const SocialBlock = styled.View``;
const SocialText = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const SocialLabel = styled.Text`
  font-style: italic;
  font-size: 14px;
  color: #707070;
  padding: 0 10px;
`;
const Line = styled.View`
  width: 25%;
  border-bottom-width: 1px;
  border-bottom-color: #707070;
`;

export default ({route, navigation}) => {
  const emailInput = useInput(
    route.params && route.params.email ? route.params.email : '',
  );
  const [loading, setLoading] = useState(false);

  const handleLoginMut = async (email) => {
    const loginResult = await requestSecretMutation({
      variables: {
        email: email,
      },
    });
    const {requestSecret} = loginResult.data || null;

    return requestSecret;
  };

  const [requestSecretMutation] = useMutation(LOG_IN);

  const handleLogin = async () => {
    const {value} = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === '') {
      return Alert.alert('Поле Email не может быть пустым');
    } else if (!value.includes('@') || !value.includes('.')) {
      return Alert.alert('Пожалуйста заполните поле Email правильно');
    } else if (!emailRegex.test(value)) {
      return Alert.alert('Вы ввели неправильный Email');
    }
    try {
      setLoading(true);
      const requestSecret = await handleLoginMut(value);
      if (requestSecret) {
        Alert.alert('Проверьте свою почту!');
        navigation.navigate('Confirm', {email: value});
      } else {
        Alert.alert('Учетная запись не найдена!');
        navigation.navigate('SignUp', {email: value});
      }
    } catch (e) {
      Alert.alert('Невозможно авторизоваться сейчас!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        resizeMode={'cover'}
        source={require('../../images/hello_bg.jpg')}>
        <AppTitle>TRAVLNOTE</AppTitle>
        <LoginBlock>
          <LoginBlockLabel>Вход</LoginBlockLabel>
          <AuthInput
            {...emailInput}
            keyboardType="email-address"
            placeholder="Email"
            returnKeyType="send"
            onSubmitEditing={handleLogin}
            autoCorrect={false}
          />
          <AuthButtonLight
            loading={loading}
            text="Войти"
            onPress={handleLogin}
          />
          <SocialBlock>
            <SocialText>
              <Line />
              <SocialLabel>войти с помощью</SocialLabel>
              <Line />
            </SocialText>
            <FacebookBtn />
          </SocialBlock>
        </LoginBlock>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
