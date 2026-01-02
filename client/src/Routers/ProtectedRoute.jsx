import { Navigate, useLocation } from 'react-router-dom';
import verifyToken from '../utils/verifyToken';
import ROUTE_CONSTANT from './routeConstants';
import PropTypes from 'prop-types';

// const AccessDenied = () => <div>Not have Access</div>;

const ProtectedRoute = ({ children, user }) => {
  let location = useLocation();

  const { Token = null } = verifyToken(user) || {};

  if (!Token) {
    return <Navigate to={ROUTE_CONSTANT.LOGIN} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.any,
  user: PropTypes.any,
};
