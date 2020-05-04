import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import constants from '../../constants';
import {AuthButtonDark} from '../../components/AuthButtonDark';

const ImageBackground = styled.ImageBackground`
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  padding-bottom: ${constants.height / 20}px;
`;

export default ({navigation}) => (
  <ImageBackground
    resizeMode={'cover'}
    source={require('../../images/hello_bg.jpg')}>
    <SafeAreaView>
      <AuthButtonDark
        marginBottom="16"
        text="Войти"
        onPress={() => navigation.navigate('Login')}
      />
      <AuthButtonDark
        text="Зарегистрироваться"
        onPress={() => navigation.navigate('SignUp')}
      />
    </SafeAreaView>
  </ImageBackground>
);
