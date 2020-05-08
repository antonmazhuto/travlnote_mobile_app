import React, {memo} from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    backgroundColor: 'transparent',
    opacity: 0.8,
  },
  iconLeftStyle: {
    paddingLeft: 5,
    opacity: 0.8,
    fontSize: 35,
  },
  rightIconStyle: {
    fontSize: 35,
    marginRight: 3,
  },
});

const Header = memo(
  ({
    title,
    iconLeft,
    iconRight,
    colorLeft,
    colorRight,
    onPress,
    onPressRight,
  }) => {
    const {container, iconLeftStyle, rightIconStyle} = styles;
    return (
      <View style={container}>
        {iconLeft && (
          <TouchableOpacity onPress={onPress}>
            <Icon name={iconLeft} style={iconLeftStyle} color={colorLeft} />
          </TouchableOpacity>
        )}
        <Text>{title}</Text>
        {iconRight && (
          <TouchableOpacity onPress={onPressRight}>
            <Icon name={iconRight} style={rightIconStyle} color={colorRight} />
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

export {Header};
