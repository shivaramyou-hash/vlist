import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CREATE_ASSIGNED_CONSTITY,
  GET_ALL_USERS,
  GET_ASSIGNEDCONSTTUTIONS_BY_USER,
  DELETE_ASSIGNED_CONSTITUENCY,
} from '../../../services/mutations';
import { useTranslation } from 'react-i18next';
import toast from '../../../components/Toast';

const useAssignConstituency = ({ userId = '' }) => {
  const { t } = useTranslation('translations');
  const [getAllUsers, { loading: allUsersLoad, data: allUsersData }] =
    useLazyQuery(GET_ALL_USERS);

  const [
    createAssignedConst,
    { data: createAssignedConstData, loading: createAssignedConstLoading },
  ] = useMutation(CREATE_ASSIGNED_CONSTITY, {
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    refetchQueries: [
      {
        query: GET_ASSIGNEDCONSTTUTIONS_BY_USER,
        variables: { userId: userId },
      }, // DocumentNode object parsed with gql
    ],
    onCompleted: (res) => {
      toast.success('Updated successfully!');
    },
    onError: (error) => {
      toast.error('An error occurred while uploading data.');
      console.error('Error uploading data:', error);
    },
  });
  const [
    getAllAssignConstitutionsByUser,
    { loading: getAllAssignConstLoading, data: getAllAssignConstData },
  ] = useLazyQuery(GET_ASSIGNEDCONSTTUTIONS_BY_USER);

  const [deleteAssignedConstituency] = useMutation(
    DELETE_ASSIGNED_CONSTITUENCY,
    {
      refetchQueries: [
        {
          query: GET_ASSIGNEDCONSTTUTIONS_BY_USER,
          variables: { userId: userId },
        }, // DocumentNode object parsed with gql
      ],
      fetchPolicy: 'network-only',
      onCompleted: (res) => {
        toast.success('Constituency deleted sucessfully');
      },
      onError: (error) => {
        toast.error(`${t('ERROR')}`);
      },
    }
  );
  return {
    loading:
      allUsersLoad || createAssignedConstLoading || getAllAssignConstLoading,
    getAllUsers,
    allUsersData,
    createAssignedConst,
    createAssignedConstData,
    getAllAssignConstitutionsByUser,
    getAllAssignConstData,
    deleteAssignedConstituency,
  };
};

export default useAssignConstituency;
