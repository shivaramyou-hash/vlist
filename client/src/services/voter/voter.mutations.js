import { gql } from '@apollo/client';

export const CREATE_VOTER = gql`
  mutation CreateVoter($input: createVotersInput) {
    createVoter(input: $input) {
      updatedEPICs
      createdEPICs
    }
  }
`;
export const UPDATE_SINGLE_VOTER = gql`
  mutation UpdateSingleVoter($input: updateVoterInput) {
    updateSingleVoter(input: $input)
  }
`;

export const GET_ALL_VOTERS = gql`
  query GetAllVoters {
    getAllVoters {
      id
      psNo
      psName
      psAddress
      SLNo
      voterName
      voterName
      houseNumber
      address
      relationType
      relationType
      age
      gender
      EPIC
      mobileNumber
      district
      state
      assemblyConst
      status
      notes
      isDeleted
    }
  }
`;
export const GET_VOTERS_POLLING_STATION = gql`
  query GetVotersByPollingStation($input: getVotersByPoll) {
    getVotersByPollingStation(input: $input) {
      id
      psNo
      psName
      psAddress
      SLNo
      voterName
      houseNumber
      address
      relationType
      age
      gender
      EPIC
      mobileNumber
      district
      state
      assemblyConst
      status
      notes
      isDeleted
    }
  }
`;

export const GET_VOTERS_ACCESS_BY_POLLING_STATION = gql`
  query GetVotersAccessByPollingStation($input: getVotersAccessByPoll) {
    getVotersAccessByPollingStation(input: $input) {
      voters {
        id
        psNo
        psName
        psAddress
        SLNo
        voterName
        houseNumber
        address
        relationType
        age
        gender
        EPIC
        mobileNumber
        district
        state
        assemblyConst
        status
        notes
        isDeleted
      }
      writeAccess
    }
  }
`;
