import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

export const NavIcon = ({
  focused = true,
  name,
  color = styles.darkBlueColor,
  onPress,
}) => (
  <Icon
    name={name}
    size={35}
    color={focused ? color : styles.darkGreyColor}
    onPress={onPress}
  />
);
