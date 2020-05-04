import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TabNavigation} from './TabNavigation';
import PhotoNavigation from './PhotoNavigation';
import {stackStyles} from './config';

const Stack = createStackNavigator();

export const MainNavigation = () => (
  <Stack.Navigator
    headerMode="none"
    mode="modal"
    screenOptions={{headerStyle: {...stackStyles}}}>
    <Stack.Screen name="TabNavigation" component={TabNavigation} />
    <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} />
  </Stack.Navigator>
);
