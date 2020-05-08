import React, {useState} from 'react';
import {View, Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Tabs/Profile';
import {createStackNavigator} from '@react-navigation/stack';
import HeaderButton from '../components/buttons/HeaderButton';
import constants from '../constants';
import styles from '../styles';
import {NavIcon} from '../components/NavIcon';
import Trip from '../screens/Tabs/Trip';
import Money from '../screens/Tabs/Money';
import Bookmark from '../screens/Tabs/Bookmark';
import {stackStyles} from './config';
import Detail from '../screens/Detail';
import EditProfile from '../screens/EditProfile';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {...stackStyles},
      }}>
      <Stack.Screen
        name="Home"
        component={Profile}
        options={{
          headerTitle: (
            <Image
              style={{
                height: 35,
                width: constants.width / 1.5,
              }}
              resizeMode="cover"
              source={require('../images/logotype.png')}
            />
          ),
          headerRight: () => <HeaderButton />,
          headerShown: false,
        }}
      />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Редактировать профиль',
        }}
      />
    </Stack.Navigator>
  );
};

export const TabNavigation = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: styles.darkBlueColor,
      showLabel: false,
      style: {
        backgroundColor: '#FAFAFA',
      },
    }}>
    <Tab.Screen
      name="HomeStack"
      component={HomeStack}
      options={{
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
            color={styles.darkBlueColor}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Trip"
      component={Trip}
      options={{
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-globe' : 'md-globe'}
            color={styles.darkBlueColor}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Money"
      component={Money}
      options={{
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-wallet' : 'md-wallet'}
            color={styles.darkBlueColor}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Add"
      component={View}
      listeners={({navigation}) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate('PhotoNavigation');
        },
      })}
      options={{
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-images' : 'md-images'}
            color={styles.darkBlueColor}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Bookmart"
      component={Bookmark}
      options={{
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-bookmark' : 'md-bookmark'}
            color={styles.darkBlueColor}
          />
        ),
      }}
    />
  </Tab.Navigator>
);
