import { gql } from '@apollo/client';

export const GET_EXTRACTED_VOTERLIST_BY_USERID = gql`
  query GetExtractedVoterListByUserId($userId: String) {
    getExtractedVoterListByUserId(userId: $userId) {
      id
      state
      district
      assemblyConst
      pollingStation
      userId
      createdOn
      status
    }
  }
`;
