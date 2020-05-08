import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from '../../styles';

export const FloatingLabelInput = ({label, ...props}) => {
  const [isFocused, setFocused] = useState(false);
  const labelStyle = {
    position: 'absolute',
    left: 0,
    top: !isFocused ? 18 : 0,
    fontSize: !isFocused ? 16 : 14,
    color: !isFocused ? '#000' : '#000',
    opacity: 0.65,
  };
  return (
    <View style={{paddingTop: 18}}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        {...props}
        style={{
          height: 26,
          fontSize: 20,
          color: styles.darkBlueColor,
          borderBottomWidth: 1,
          borderBottomColor: styles.darkGreyColor,
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};
