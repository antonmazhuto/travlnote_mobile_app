import React from 'react';
import styled from 'styled-components';
import constants from '../constants';
import {ActivityIndicator} from 'react-native';

const Touchable = styled.TouchableOpacity`
  margin-bottom: ${(props) => props.marginBottom || 0}px;
`;
const ContainerDark = styled.View`
  background-color: ${(props) => props.theme.milkColor};
  padding: 10px 0;
  width: ${constants.width - 50}px;
  border-radius: 8px;
  opacity: 0.9;
`;

const Text = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.darkBlueColor};
  text-align: center;
`;

export const AuthButtonDark = ({text, onPress, loading = false, ...rest}) => (
  <Touchable disabled={loading} onPress={onPress} {...rest}>
    <ContainerDark>
      {loading ? (
        <ActivityIndicator color={(props) => props.theme.darkBlueColor} />
      ) : (
        <Text>{text}</Text>
      )}
    </ContainerDark>
  </Touchable>
);
