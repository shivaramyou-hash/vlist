import { decodeToken } from 'react-jwt';

const verifyToken = (token) => {
  if (!token) return null;
  const isValid = decodeToken(token);
  if (!isValid) return null;
  return isValid;
};

export default verifyToken;
