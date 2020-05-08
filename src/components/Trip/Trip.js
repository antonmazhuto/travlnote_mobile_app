import React from 'react';
import {View, Text} from 'react-native';

export default ({trip: {country, name}}) => {
  return (
    <View>
      <Text>
        {country} - {name}
      </Text>
    </View>
  );
};
