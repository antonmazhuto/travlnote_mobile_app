import React from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';
import {ScrollView} from 'react-native';
import Loader from '../components/Loader';
import Trip from '../components/Trip/Trip';

const TRIP_DETAIL = gql`
  query seeFullTrip($id: String!) {
    seeFullTrip(id: $id) {
      trip {
        name
        country
        plannedBudget
        priceTickets
        priceDocuments
      }
      photos {
        id
      }
      dayCount
    }
  }
`;

export default ({route}) => {
  const {loading, data, error} = useQuery(TRIP_DETAIL, {
    variables: {id: route.params.id},
  });
  console.log(data);
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFullTrip && <Trip {...data.seeFullTrip} />
      )}
    </ScrollView>
  );
};
