import {gql} from 'apollo-boost';

export const ME = gql`
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

export const EDIT_USER = gql`
  mutation editUser(
    $username: String
    $email: String
    $firstName: String
    $lastName: String
    $bio: String
  ) {
    editUser(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
      bio: $bio
    )
  }
`;
