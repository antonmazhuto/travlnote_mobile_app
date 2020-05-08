import React, {useState} from 'react';
import styled from 'styled-components';
import {ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import Loader from '../../components/Loader';
import {gql} from 'apollo-boost';
import {USER_FRAGMENT} from '../../fragments';
import {UserProfile} from '../../components/Profile/UserProfile';
import {AppContainer} from '../../components/AppContainer';
import {ME} from './ProfileQueries';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Text = styled.Text``;

const ToolTip = styled.View`
  background-color: #fdfdfd;
  width: 200px;
  padding: 20px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
`;

export default ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const {loading, data, refetch} = useQuery(ME);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const [isVisible, setVisible] = useState(false);

  return (
    <AppContainer
      title="Профиль"
      iconRight="ios-menu"
      flatlist={true}
      onPressRight={() => setVisible((prevState) => !prevState)}>
      {isVisible && (
        <ToolTip>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditProfile', data.me.user);
              setVisible(false);
            }}>
            <Text>редактировать профиль</Text>
          </TouchableOpacity>
        </ToolTip>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }>
        {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
      </ScrollView>
    </AppContainer>
  );
};
