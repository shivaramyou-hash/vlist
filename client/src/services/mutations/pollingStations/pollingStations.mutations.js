import { gql } from '@apollo/client';

export const CREATE_POLLING_STATIONS = gql`
  mutation CreatePollingStations($input: createPollingStationsInput) {
    createPollingStations(input: $input) {
      data
    }
  }
`;

export const GET_POLLING_STATIONS = gql`
  query GetPollingStations(
    $state: String
    $district: Int
    $assemblyConst: Int
  ) {
    getPollingStations(
      state: $state
      district: $district
      assemblyConst: $assemblyConst
    ) {
      id
      pollingStationName
      pollingStationCode
      pollingStationAddress
      state
      district
      assemblyConst
    }
  }
`;
export const GET_ASSIGNED_POLLING_STATIONS = gql`
  query GetAssignedPollingStations($input: assigedPollingstationsInput) {
    getAssignedPollingStations(input: $input) {
      id
      pollingStationName
      pollingStationCode
      pollingStationAddress
      state
      district
      assemblyConst
    }
  }
`;
