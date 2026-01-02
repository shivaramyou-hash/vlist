import { useLazyQuery, useMutation } from '@apollo/client';

import {
  GET_VOTERS_POLLING_STATION,
  UPDATE_SINGLE_VOTER,
} from '../../services/mutations';
import toast from '../../components/Toast';

const useUsers = ({ state, district, assemblyConst, psNo }) => {
  const [updateSingleVoter, { loading: updateSingleVoterLoading }] =
    useMutation(UPDATE_SINGLE_VOTER, {
      fetchPolicy: 'network-only',
      onCompleted: (res) => {
        toast.success('Voter updated sucessfully');
      },
      onError: (error) => {
        toast.error(error);
      },
      refetchQueries: [
        {
          query: GET_VOTERS_POLLING_STATION,
          variables: {
            input: {
              state: state,
              district: district,
              assemblyConst: assemblyConst,
              pollingStationCode: psNo,
            },
          },
        }, // DocumentNode object parsed with gql
      ],
    });

  return {
    loading: updateSingleVoterLoading,
    updateSingleVoter,
  };
};

export default useUsers;
