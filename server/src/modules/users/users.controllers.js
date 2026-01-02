require("dotenv").config();
const { first } = require("../../db/knex");
const { authMiddleware } = require("../../utilities/authMiddleware");
const UserDB = require("./users.db");
const jwt = require("jsonwebtoken");

exports.userLogin = async (_, args, context) => {
  // const { isValid } = await authMiddleware(context);
  // if (!isValid) return;

  try {
    const userData = await UserDB.getUserByEmail(args, context);

    if (userData) {
      const checkPass = userData.password === args.password;
      if (!checkPass) {
        return {
          message: "Please check your credentials.",
        };
      } else {
        let accessToken = jwt.sign(
          { Token: userData },
          process.env.ACCESS_TOKEN_SECRET
        );
        return {
          Token: accessToken,
          message: "Logged in successfully.",
          userData,
        };
      }
    } else {
      return { message: "No Credential Found" };
    }
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (_, args, context) => {
  const { isValid, user } = await authMiddleware(context);
  if (!isValid) return;
  const userId = args.userId === "token" ? user[0].userId : args.userId;

  return await UserDB.getUserById({ ...args, userId }, context);
};

exports.getAllUsers = async (_, args, context) => {
  // const { isValid } = await authMiddleware(context);
  // if (!isValid) return;

  return await UserDB.getAllUsers();
};

exports.createUser = async (_, args, context) => {
  // const { isValid } = await authMiddleware(context);
  // if (!isValid) return;
  const { firstName, lastName } = args.input;

  const firstTwoLetters = (
    firstName.charAt(0) + lastName.charAt(0)
  ).toUpperCase();
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate a random 5-digit number

  const userId = `${firstTwoLetters}${randomNumber}`;

  // Create the user with the generated user ID
  return await UserDB.createUser({ ...args.input, userId }, context);
};

exports.updateUser = async (_, args, context) => {
  // const { isValid } = await authMiddleware(context);
  // if (!isValid) return;
  return await UserDB.updateUser(args, context);
};
exports.deleteUser = async (_, args, context) => {
  // const { isValid } = await authMiddleware(context);
  // if (!isValid) return;
  return await UserDB.deleteUser(args, context);
};
