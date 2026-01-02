import { gql } from '@apollo/client';

export const GET_CONSTITUTIONS_BY_DISTRICTS = gql`
  query GetConstitutionsByDistricts($stateCode: String, $districtCode: Int) {
    getConstitutionsByDistricts(
      stateCode: $stateCode
      districtCode: $districtCode
    ) {
      constitutionName
      districtCode
    }
  }
`;
export const GET_ASSEIGNED_CONSTITUTIONS_BY_DISTRICTS = gql`
  query GetAssignedConstitutionsByDistricts(
    $stateCode: String
    $districtCode: Int
    $userId: String
  ) {
    getAssignedConstitutionsByDistricts(
      stateCode: $stateCode
      districtCode: $districtCode
      userId: $userId
    ) {
      district
      assemblyConstCode
      assemblyConstName
    }
  }
`;

export const CREATE_ASSIGNED_CONSTITY = gql`
  mutation createassignedConstity($input: assignedConstInput) {
    createassignedConstity(input: $input) {
      userId
    }
  }
`;
