import React from 'react';
import {Alert, Image, View} from 'react-native';
import styled from 'styled-components';
import styles from '../styles';
import constants from '../constants';
import {TripCard} from './TripCard';
import {Avatar} from 'react-native-elements';
import { useLogOut } from '../AuthContext';

const ProfileHeader = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const HeaderColumn = styled.View``;
const TripsColumn = styled.View`
  padding: 0 10px;
`;
const HeaderRow = styled.View`
  height: 56px;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #707070;
`;
const CircleView = styled.View`
  width: 88px;
  height: 88px;
  background-color: ${(props) => props.theme.darkGreyColor};
  border-radius: 40px;
`;
const ProfileStats = styled.View`
  flex-direction: row;
`;
const Stat = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
`;
const Bold = styled.Text`
  font-weight: 600;
`;
const StatName = styled.Text`
  font-size: 12px;
  color: ${styles.darkBlueColor};
`;
const ProfileMeta = styled.View``;

const FullName = styled.Text``;

const ProfileBG = styled.Image`
  flex: 1;
  height: ${constants.height/4}px;
  width: 100%;
`;
//margin-top: -20px;

const AvatarView = styled.View`
margin-top: -50px;
`;

const Title = styled.Text``;

const ViewWithPadding = styled.View`
  padding: 0 ${constants.width/10}px;
`;


export const UserProfile = ({user: {avatar, bio, fullName, username, firstName, lastName}, tripsCount, trips}) => {
   return (
      <View>
         <HeaderColumn>
            <ProfileBG resizeMode={'cover'} source={require('../images/profile_bg.jpg')}/>
            <HeaderRow>
               <ProfileMeta>
                  <Bold>{username}</Bold>
                  <FullName>{fullName}</FullName>
               </ProfileMeta>
               <AvatarView>
                  {avatar ? (
                     <Avatar
                        rounded
                        source={{
                           uri: avatar,
                        }}
                        showAccessory
                     />
                  ) : (
                     <Avatar
                        size="large"
                        rounded
                        title={lastName && firstName && (lastName[0] + firstName[0])}
                        containerStyle={{backgroundColor: styles.darkGreyColor}}
                        activeOpacity={0.7}
                        onAccessoryPress={useLogOut()}
                        showAccessory
                     />
                  )}
               </AvatarView>
               <ProfileStats>
                  <Stat>
                     <StatName>путешествий</StatName>
                     <Bold>{tripsCount}</Bold>
                  </Stat>
               </ProfileStats>
            </HeaderRow>
         </HeaderColumn>
         <TripsColumn>
            <Title>Мои путешествия</Title>
            {
               trips && trips.map(trip => <TripCard key={trip.id} {...trip}/>)
            }
         </TripsColumn>
      </View>
   )
};
