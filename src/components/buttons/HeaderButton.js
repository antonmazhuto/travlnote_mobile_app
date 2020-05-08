import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Platform, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {NavIcon} from '../NavIcon';

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;
const ToolTip = styled.View`
  background-color: #fdfdfd;
  width: 200px;
  padding: 20px;
  position: absolute;
  top: 40px;
  right: 0;
`;

export default () => {
  const [isVisible, setVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <>
      <Container>
        <NavIcon
          name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
          onPress={() => setVisible((prevState) => !prevState)}
        />
      </Container>
      {isVisible && (
        <ToolTip>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditProfile');
              setVisible(false);
            }}>
            <Text>редактировать профиль</Text>
          </TouchableOpacity>
        </ToolTip>
      )}
    </>
  );
};
