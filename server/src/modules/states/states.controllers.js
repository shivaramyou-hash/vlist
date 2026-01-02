require("dotenv").config();
const { authMiddleware } = require("../../utilities/authMiddleware");
// const UserDB = require("./users.db");
const StatesDB = require("./states.db");

exports.getAllStates = async (_, args, context) => {
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;
  //   const userId = args.userId === "token" ? user[0].userId : args.userId;

  //   return await StatesDB.getAllStates({ ...args, userId }, context);
  return await StatesDB.getAllStates(context);
};

// exports.getAllUsers = async (_, args, context) => {
//   // const { isValid } = await authMiddleware(context);
//   // if (!isValid) return;

//   return await UserDB.getAllUsers();
// };
