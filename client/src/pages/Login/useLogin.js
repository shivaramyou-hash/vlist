// import toast from '../../components/Toast';
import { useLazyQuery } from '@apollo/client';
import { USER_LOGIN, GET_USER_BY_ID } from '../../services/mutations';
import { useDispatch } from 'react-redux';
import {
  userLogin as login,
  fetchUserData,
} from '../../redux/reducers/user.reducer';
import { useEffect } from 'react';

const useLogin = () => {
  const dispatch = useDispatch();

  //   const [userLogin, { loading, error }] = useLazyQuery(USER_LOGIN, {
  //     fetchPolicy: 'network-only', // Doesn't check cache before making a network request
  //     onError: (error) => {
  //       createErrorLog(error, 'userLogin', user.userId, user.orgId);
  //     },
  //   });

  const [userLogin, { data: userLoginData, loading: userLoginLoading }] =
    useLazyQuery(USER_LOGIN);

  const [getUserById, { data: getUserByIdData, loading: getUserByIdLoading }] =
    useLazyQuery(GET_USER_BY_ID, {
      fetchPolicy: 'network-only', // Doesn't check cache before making a network request
      variables: {
        userId: 'token',
      },
    });

  useEffect(() => {
    if (getUserByIdData?.getUserById) {
      dispatch(fetchUserData(getUserByIdData?.getUserById || null));
    }
  }, [getUserByIdData, dispatch]);

  return {
    loading: userLoginLoading || getUserByIdLoading,
    userLogin,
    userLoginData,
    getUserById,
    getUserByIdData,
  };
};

export default useLogin;
