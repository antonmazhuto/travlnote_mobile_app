import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../screens/Auth/SignUp';
import Login from '../screens/Auth/Login';
import Confirm from '../screens/Auth/Confirm';
import AuthHome from '../screens/Auth/AuthHome';

const Stack = createStackNavigator();

export const AuthNavigation = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="AuthHome" component={AuthHome} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Confirm" component={Confirm} />
  </Stack.Navigator>
);
