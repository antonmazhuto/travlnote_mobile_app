import React, {useContext} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';
import {AuthNavigation} from '../navigation/AuthNavigation';
import {MainNavigation} from '../navigation/MainNavigation';

export default () => {
  const {isLoggedIn, logUserIn, setLogUserOut} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};
