import { gql } from '@apollo/client';
export const GET_ASSIGNEDCONSTTUTIONS_BY_USER = gql`
  query getAssignedConstitutionsByUser($userId: String) {
    getAssignedConstitutionsByUser(userId: $userId) {
      district
      state
      assemblyConst
      pollingStations
      stateName
      districtName
      assemblyConstName
      pollingStationNames
      writeAccess
      id
    }
  }
`;

export const DELETE_ASSIGNED_CONSTITUENCY = gql`
  mutation DeleteAssignedConstituency($id: Int!) {
    deleteAssignedConstituency(id: $id)
  }
`;
