import React, {useContext, useState} from 'react';
import {Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components';
import {AuthInput} from '../../components/Auth/AuthInput';
import {AuthButtonLight} from '../../components/buttons/AuthButtonLight';
import {useInput} from '../../hooks/useInput';
import {useMutation} from '@apollo/react-hooks';
import {CONFIRM_SECRET} from './AuthQueries';
import {useLogIn} from '../../AuthContext';

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

export default ({route}) => {
  const confirmInput = useInput('');
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET);
  const logIn = useLogIn();

  const handleConfirmMut = async (secret) => {
    const {email} = route.params;
    const confirmResult = await confirmSecretMutation({
      variables: {
        secret: secret,
        email: email,
      },
    });
    const {confirmSecret} = confirmResult.data || null;
    return confirmSecret;
  };

  const handleConfirm = async () => {
    const {value} = confirmInput;
    if (value === '' || !value.includes(' ')) {
      return Alert.alert('Неправильное секретное слово!');
    }
    try {
      setLoading(true);
      const confirmSecret = await handleConfirmMut(value);
      if (confirmSecret !== '' || confirmSecret !== false) {
        logIn(confirmSecret);
      } else {
        Alert.alert('Неправильное секретное слово!');
      }
    } catch (e) {
      Alert.alert('Не возможно подтвердить секретное слово!');
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
            {...confirmInput}
            placeholder="Secret"
            returnKeyType="send"
            onSubmitEditing={handleConfirm}
            autoCorrect={false}
          />
          <AuthButtonLight
            loading={loading}
            text="Подтвердить"
            onPress={handleConfirm}
          />
        </LoginBlock>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
