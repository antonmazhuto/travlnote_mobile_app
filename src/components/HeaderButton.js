import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components';
import {NavIcon} from './NavIcon';

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;

export default () => (
  <Container>
    <NavIcon name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'} />
  </Container>
);
