import { Navigate, useLocation } from 'react-router';
import ROUTE_CONSTANT from './routeConstants';
import PropTypes from 'prop-types';

const PublicRoute = ({ children, user }) => {
  let location = useLocation();
  if (user) {
    return <Navigate to={ROUTE_CONSTANT.HOME} state={{ from: location }} />;
  }
  return children;
};

export default PublicRoute;

PublicRoute.propTypes = {
  children: PropTypes.any,
  user: PropTypes.any,
};
