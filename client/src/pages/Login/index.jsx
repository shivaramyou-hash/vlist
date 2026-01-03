import { useEffect, useState } from 'react';
import useLogin from './useLogin';
import { useDispatch } from 'react-redux';
import { userLogin as login } from '@/redux/reducers/user.reducer';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.png';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userLogin, userLoginData, loading } = useLogin();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      userLoginData?.userLogin?.token !== null &&
      userLoginData?.userLogin?.userData !== null &&
      !!userLoginData
    ) {
      dispatch(login(userLoginData?.userLogin || null));
      toast.success(userLoginData?.userLogin?.message);
      window.location.href = '/';
    } else if (
      (userLoginData?.userLogin?.token === null ||
        userLoginData?.userLogin?.token === undefined) &&
      (userLoginData?.userLogin?.userData === null ||
        userLoginData?.userLogin?.userData === undefined) &&
      !!userLoginData
    ) {
      toast.error(userLoginData?.userLogin?.message || 'Login failed');
    }
  }, [userLoginData, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const variables = {
      email: email,
      password: password,
      orgId: 1,
    };
    userLogin({ variables }).then((res) => {
        window.location.reload();
   
    });
  };
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
        <div className="flex flex-col items-center">
          <img className="h-16 w-auto mb-4" src={logo} alt="Logo" />
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Sign in to your account
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
