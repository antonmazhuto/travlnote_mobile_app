import React, {useState} from 'react';
import {Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from 'styled-components';
import {AuthInput} from '../../components/Auth/AuthInput';
import {AuthButtonLight} from '../../components/buttons/AuthButtonLight';
import {useInput} from '../../hooks/useInput';
import {useMutation} from '@apollo/react-hooks';
import {CREATE_ACCOUNT} from './AuthQueries';
import {AuthButtonDark} from '../../components/buttons/AuthButtonDark';
import constants from '../../constants';
import FacebookBtn from '../../components/buttons/FacebookBtn';
// import FacebookBtn from "../../components/FacebookBtn";

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
  margin-bottom: 10px;
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
  const fNameInput = useInput('');
  const lNameInput = useInput('');
  const emailInput = useInput(
    route.params && route.params.email ? route.params.email : '',
  );
  const uNameInput = useInput('');

  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT);

  const handleSignUpMut = async () => {
    const createResult = await createAccountMutation({
      variables: {
        username: uNameInput.value,
        email: emailInput.value,
        firstName: fNameInput.value,
        lastName: lNameInput.value,
      },
    });
    const {createAccount} = createResult.data || null;
    return createAccount;
  };

  const handleSignUp = async () => {
    const {value: email} = emailInput;
    const {value: fName} = fNameInput;
    const {value: lName} = lNameInput;
    const {value: uName} = uNameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert('Вы ввели неправильный Email');
    }
    if (fName === '') {
      return Alert.alert('Заполните свое имя!');
    }
    if (uName === '') {
      return Alert.alert('Заполните поле username');
    }
    try {
      setLoading(true);
      const createAccount = await handleSignUpMut();
      if (createAccount) {
        Alert.alert('Аккаунт создан', 'Войдите сейчас');
        navigation.navigate('Login', {email});
      }
    } catch (e) {
      Alert.alert('Это username уже существует', 'Попробуйте войти');
      navigation.navigate('Login', {email});
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
          <LoginBlockLabel>Регистрация</LoginBlockLabel>
          <SocialBlock>
            <SocialText>
              <Line />
              <SocialLabel>войти с помощью</SocialLabel>
              <Line />
            </SocialText>
            <FacebookBtn />
            <SocialText>
              <SocialLabel>или регистрация через e-mail</SocialLabel>
            </SocialText>
          </SocialBlock>
          <AuthInput {...fNameInput} placeholder="Имя" autoCapitalize="words" />
          <AuthInput
            {...lNameInput}
            placeholder="Фамилия"
            autoCapitalize="words"
          />
          <AuthInput
            {...emailInput}
            keyboardType="email-address"
            placeholder="Email"
            returnKeyType="send"
            autoCorrect={false}
          />
          <AuthInput
            {...uNameInput}
            placeholder="Username"
            returnKeyType="send"
            autoCorrect={false}
          />
          <AuthButtonLight
            loading={loading}
            text="Зарегистрироваться"
            onPress={handleSignUp}
          />
        </LoginBlock>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
