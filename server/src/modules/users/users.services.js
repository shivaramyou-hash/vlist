require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require("jsonwebtoken");

exports.userGoogleVerification = async ({ token }) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
      requiredAudience: process.env.CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (e) {
    return {};
  }
};

exports.userVerification = ({ token }) => {
  try {
    const accessToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return accessToken.Token;
  } catch (e) {
    return {};
  }
};

// exports.userIdGeneration = ({ firstName, lastName }) =>
//   `${firstName[0]}${lastName[0]}${Math.floor(100000 + Math.random() * 900000)}`;

exports.userIdGeneration = ({
  allowedAlphabets,
  userIdLength,
  noOfDigits,
  userIds,
}) => {
  const numbers = Math.floor(
    10 ** (noOfDigits - 1) +
      Math.random() * (10 ** noOfDigits - 10 ** (noOfDigits - 1))
  );
  const userId = `${allowedAlphabets}${numbers}`.slice(0, userIdLength);
  return userId;
};

exports.userNameGeneration = ({ firstName, lastName }) =>
  `${firstName[0]}${lastName[0]}${Math.floor(100000 + Math.random() * 900000)}`;
