import { useDispatch } from 'react-redux';
import { logOut } from '../redux/reducers/user.reducer';

import { useLocalStorage } from '../utils/useLocalStorage';

const useLogout = () => {
  const dispatch = useDispatch();
  const [, setValue] = useLocalStorage('token', null);
  const userLogout = () => {
    dispatch(logOut());
    setValue(null);
  };
  return {
    userLogout,
  };
};

export default useLogout;
