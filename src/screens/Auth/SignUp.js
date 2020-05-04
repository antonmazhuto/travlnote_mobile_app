import React, {useState} from 'react';
import {Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from 'styled-components';
import {AuthInput} from '../../components/AuthInput';
import {AuthButtonLight} from '../../components/AuthButtonLight';
import {useInput} from '../../hooks/useInput';
import {useMutation} from '@apollo/react-hooks';
import {CREATE_ACCOUNT} from './AuthQueries';
import {AuthButtonDark} from '../../components/AuthButtonDark';
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
`;

const FBContainer = styled.View`
  margin-top: 30px;
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
        <LoginBlock>
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
        <FBContainer>
          {/*<FacebookBtn/>*/}
          <AuthButtonDark
            loading={false}
            onPress={() => null}
            text="Войти через Facebook"
          />
        </FBContainer>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
