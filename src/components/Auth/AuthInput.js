import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  margin-bottom: 25px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.darkBlueColor};
`;
const TextInput = styled.TextInput`
  font-size: 20px;
  color: ${(props) => props.theme.blackColor};
  opacity: 0.65;
`;

export const AuthInput = ({
  placeholder,
  value,
  keyboardType = 'default',
  autoCapitalize = 'none',
  onChange,
  returnKeyType = 'done',
  onSubmitEditing = () => null,
  autoCorrect = 'true',
}) => (
  <Container>
    <TextInput
      onChangeText={onChange}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      placeholder={placeholder}
      value={value}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
    />
  </Container>
);
