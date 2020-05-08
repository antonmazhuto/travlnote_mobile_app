import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import constants from '../../constants';
import {AuthButtonDark} from '../../components/buttons/AuthButtonDark';

const ImageBackground = styled.ImageBackground`
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  padding-bottom: ${constants.height / 20}px;
`;

const AppTitle = styled.Text`
  font-family: 'Josefin Sans';
  font-size: 56px;
`;

const Epigraph = styled.Text`
  width: ${constants.width / 1.5}px;
  font-size: 15px;
`;

const Buttons = styled.View``;

const TitleSections = styled.View`
  height: ${constants.height / 2.2}px;
  justify-content: space-around;
`;

export default ({navigation}) => (
  <ImageBackground
    resizeMode={'cover'}
    source={require('../../images/hello_bg.jpg')}>
    <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
      <TitleSections>
        <Epigraph>
          "Посмотри на мир.{'\n'} Он гораздо удивительнее снов."
        </Epigraph>
        <AppTitle>TRAVLNOTE</AppTitle>
      </TitleSections>
      <Buttons>
        <AuthButtonDark
          marginBottom="16"
          text="Войти"
          onPress={() => navigation.navigate('Login')}
        />
        <AuthButtonDark
          text="Зарегистрироваться"
          onPress={() => navigation.navigate('SignUp')}
        />
      </Buttons>
    </SafeAreaView>
  </ImageBackground>
);
