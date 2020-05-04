import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import SelectPhoto from '../screens/Photo/SelectPhoto';
import TakePhoto from '../screens/Photo/TakePhoto';
import UploadPhoto from '../screens/Photo/UploadPhoto';
import {stackStyles} from './config';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PhotoTabs = () => (
  <Tab.Navigator tabBarPosition="bottom">
    <Tab.Screen name="SelectPhoto" component={SelectPhoto} options={{tabBarLabel: 'Галерея'}} />
    <Tab.Screen name="TakePhoto" component={TakePhoto} options={{tabBarLabel: 'Фото'}} />
  </Tab.Navigator>
);

export default () => (
  <Stack.Navigator screenOptions={{headerStyle: {...stackStyles}}}>
    <Stack.Screen name="PhotoTabs" component={PhotoTabs} />
    <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
  </Stack.Navigator>
);
