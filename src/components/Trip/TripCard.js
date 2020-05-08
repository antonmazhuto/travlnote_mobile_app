import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.darkGreyColor};
  margin-bottom: 10px;
`;
const CountryTitle = styled.Text``;
const TripDates = styled.Text``;

export const TripCard = ({id, country, dateFrom, dateTo, image}) => {
  const navigation = useNavigation();
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate('Detail', {id})}>
        <ImageBackground source={image ? image : null} style={{width: '100%'}}>
          <CountryTitle>{country}</CountryTitle>
          <TripDates>
            {dateFrom} - {dateTo}
          </TripDates>
        </ImageBackground>
      </TouchableOpacity>
    </Container>
  );
};
