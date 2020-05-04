import React, {useState} from 'react';
import styled from 'styled-components';
import {ScrollView, RefreshControl} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import Loader from '../../components/Loader';
import {gql} from 'apollo-boost';
import {USER_FRAGMENT} from '../../fragments';
import {UserProfile} from '../../components/UserProfile';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Text = styled.Text``;

const ME = gql`
  {
    me {
      user {
        fullName
        username
        firstName
        lastName
        bio
      }
      trips {
        id
        country
        priceTickets
        priceDocuments
        dateFrom
        dateTo
      }
      tripsCount
    }
  }
`;

export default ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const {loading, data, refetch} = useQuery(ME);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch()
    } catch (e) {
      console.log(e)
    } finally {
      setRefreshing(false)
    }
  };

  return (
    <ScrollView refreshControl = {<RefreshControl refreshing={refreshing} onRefresh={refresh}/>}>
      {
        loading ?
         <Loader /> :
         data && data.me &&
         <UserProfile {...data.me} />
      }
    </ScrollView>
  );
};
