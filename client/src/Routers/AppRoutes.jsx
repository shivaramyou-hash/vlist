/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routesData';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
// import NotFoundPage from '../pages/notFound';
import { useSelector } from 'react-redux';
import useLogin from '@/pages/Login/useLogin';
// import BackdropLoader from '../components/loader/BackdropLoader';

import NavBar from '../components/Navbar/Navbar';
// import ApplicantNavBar from "../components/navBar/ApplicantNavBar";
// import useLogin from '../pages/login/useLogin';
// import useApplicant from "../pages/applicant/useApplicant";

const AppRoutes = () => {
  const { token } = useSelector((state) => state.user);
  const { userData } = useSelector((state) => state.user);
  const { getUserById } = useLogin();
  // const { getApplicant } = useApplicant({
  //   applicantId: userData?.userId,
  //   orgId: 1,
  // });

  const init = async () => {
    const localToken = await localStorage.getItem('token');
    if (token || localToken) {
      getUserById({
        variables: {
          userId: 'token',
        },
      });
      // getApplicant();
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Routes>
      {routes.map(({ component: Component, ...i }, index) => {
        return (
          <Route
            key={index}
            {...i}
            element={
              <Suspense>
                {i.isPublic ? (
                  <PublicRoute user={token}>
                    <Component />
                  </PublicRoute>
                ) : (
                  <ProtectedRoute
                    // roles={i.roles}
                    // depts={i.depts}
                    user={token}
                    userData={userData}
                    path={i.path}
                  >
                    <NavBar>
                      <Component />
                    </NavBar>
                  </ProtectedRoute>
                )}
              </Suspense>
            }
          />
        );
      })}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};
export default AppRoutes;
