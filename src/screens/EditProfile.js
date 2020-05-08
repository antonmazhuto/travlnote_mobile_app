import React from 'react';
import styled from 'styled-components';
import {useInput} from '../hooks/useInput';
import {
  Alert,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {AuthInput} from '../components/Auth/AuthInput';
import {AuthButtonLight} from '../components/buttons/AuthButtonLight';
import {useMutation} from '@apollo/react-hooks';
import {EDIT_USER, ME} from './Tabs/ProfileQueries';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Block = styled.View`
  width: 90%;
  background-color: ${(props) => props.theme.white};
  opacity: 0.83;
  padding: 27px 23.5px 24px;
  border-radius: 10px;
`;

export default ({route, navigation}) => {
  const fNameInput = useInput(
    route.params && route.params.firstName ? route.params.firstName : '',
  );
  const uNameInput = useInput(
    route.params && route.params.username ? route.params.username : '',
  );
  const [editUserMutation, {loading}] = useMutation(EDIT_USER, {
    variables: {
      username: uNameInput.value,
      firstName: fNameInput.value,
    },
  });

  const handleEditMut = async () => {
    const editRes = await editUserMutation({
      variables: {
        username: uNameInput.value,
        firstName: fNameInput.value,
      },
      refetchQueries: [
        {
          query: ME,
        },
      ],
      awaitRefetchQueries: true,
    });
    const {editUser} = editRes.data || null;
    return editUser;
  };

  const handleSave = async () => {
    const {value: fName} = fNameInput;
    const {value: uName} = uNameInput;
    if (fName === '') {
      return Alert.alert('Заполните свое имя!');
    }
    try {
      const editUser = await handleEditMut();
      if (editUser) {
        navigation.navigate('Home');
      }
    } catch (e) {
      console.log(e);
      Alert.alert('ERRRRR', e.message);
    }
  };
  const icon = Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back';
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      iconLeft="ios-arrow-back">
      <Container>
        <Block>
          <AuthInput
            {...fNameInput}
            placeholder="Имя"
            autoCapitalize="words"
            autoCorrect={false}
          />
          <AuthInput
            {...uNameInput}
            placeholder="user name / логин"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <AuthButtonLight
            text="Сохранить"
            loading={loading}
            onPress={handleSave}
          />
        </Block>
      </Container>
    </TouchableWithoutFeedback>
  );
};
