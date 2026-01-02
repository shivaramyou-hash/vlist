import { useLazyQuery, useMutation } from '@apollo/client';
import {
  GET_ALL_USERS,
  CREATE_USER,
  GET_USER_BY_ID,
  UPDATE_USER,
  GET_ROLES,
  DELETE_USER,
} from '../../../services/mutations';
import toast from '../../../components/Toast';
import { useTranslation } from 'react-i18next';

const useUsers = () => {
  const { t } = useTranslation('translations');

  const [createUser] = useMutation(CREATE_USER, {
    fetchPolicy: 'network-only',
    onCompleted: (res) => {
      toast.success('User created sucessfully');
    },
    onError: (error) => {
      toast.error(`${t('ERROR')}`);
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    fetchPolicy: 'network-only',
    onCompleted: (res) => {
      toast.success('User updated sucessfully');
    },
    onError: (error) => {
      toast.error(`${t('ERROR')}`);
    },
  });

  const [deleteUser, { loading: deleteUserLoading }] = useMutation(
    DELETE_USER,
    {
      fetchPolicy: 'network-only',
      refetchQueries: [{ query: GET_ALL_USERS }],
      onCompleted: (res) => {
        toast.success('User deleted successfully');
      },
      onError: (error) => {
        toast.error(`${t('ERROR')}`);
      },
    }
  );

  const [getAllUsers, { loading: allUsersLoad, data: allUsersData }] =
    useLazyQuery(GET_ALL_USERS);

  const [getUserByUserId, { data: userData, loading: userDataLoad }] =
    useLazyQuery(GET_USER_BY_ID, {
      fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    });

  const [getAllRoles, { loading: rolesLoad, data: rolesData }] =
    useLazyQuery(GET_ROLES);
  return {
    loading: allUsersLoad || rolesLoad || deleteUserLoading,
    getAllUsers,
    allUsersData,
    createUser,
    getUserByUserId,
    userDataLoad,
    userData,
    updateUser,
    getAllRoles,
    rolesData,
    deleteUser,
  };
};

export default useUsers;
