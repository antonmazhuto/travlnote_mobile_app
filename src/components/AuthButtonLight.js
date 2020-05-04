import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import constants from '../constants';

const Touchable = styled.TouchableOpacity`
  margin-bottom: ${(props) => props.marginBottom || 0}px;
`;
const ContainerLight = styled.View`
  background-color: ${(props) => props.theme.white};
  border: solid 1px #001f6b;
  padding: 10px 0;
  width: auto;
  border-radius: 8px;
  opacity: 0.9;
`;
const Text = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.darkBlueColor};
  text-align: center;
`;

export const AuthButtonLight = ({text, onPress, loading = false, ...rest}) => (
  <Touchable disabled={loading} onPress={onPress} {...rest}>
    <ContainerLight>
      {loading ? (
        <ActivityIndicator color={(props) => props.theme.darkBlueColor} />
      ) : (
        <Text>{text}</Text>
      )}
    </ContainerLight>
  </Touchable>
);
