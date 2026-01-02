import { gql } from '@apollo/client';

export const GET_DISTRICTS_BY_STATES = gql`
  query GetDistrictsByState($stateCode: String) {
    getDistrictsByState(stateCode: $stateCode) {
      districtCode
      districtName
      stateCode
    }
  }
`;
