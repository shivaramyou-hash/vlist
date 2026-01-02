import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_EXTRACTED_VOTERLIST_BY_USERID } from '../../../services/mutations';

const useExtractedVoter = () => {
  const [
    getExtractedVoterListByUserId,
    { data: extractedVoterData, loading: extractedVoterLoader },
  ] = useLazyQuery(GET_EXTRACTED_VOTERLIST_BY_USERID, {
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
  });
  return {
    getExtractedVoterListByUserId,
    extractedVoterData,
    loading: extractedVoterLoader,
  };
};

export default useExtractedVoter;
