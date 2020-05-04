import React, {useState} from 'react';
import {Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from 'styled-components';
import {AuthInput} from '../../components/AuthInput';
import {AuthButtonLight} from '../../components/AuthButtonLight';
import {useInput} from '../../hooks/useInput';
import {useMutation} from '@apollo/react-hooks';
import {LOG_IN} from './AuthQueries';

const ImageBackground = styled.ImageBackground`
  justify-content: center;
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
        <LoginBlock>
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
        </LoginBlock>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
