import { gql } from '@apollo/client';

export const GET_ALL_STATES = gql`
  query GetAllStates {
    getAllStates {
      stateCode
      stateName
    }
  }
`;
