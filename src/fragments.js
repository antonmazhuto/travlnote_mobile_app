import {gql} from 'apollo-boost';

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    user {
      avatar
      fullName
      username
      firstName
      bio
    }
    trips {
      id
      country
      priceTickets
      priceDocuments
    }
  }
`;
