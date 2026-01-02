const knex = require("../../db/knex");
const tables = require("../../constants/tables");

// exports.getUser = async (context) => {
//   return await knex(
//     context?.tablePrefix ? `${context.tablePrefix}-${tables.USER}` : tables.USER
//   )
//     .where({ isActive: true })
//     .select("*");
// };
exports.getUserById = async (args, context) => {
  try {
    const { userId } = args;
    const data = await knex(tables.USERS).where({ userId: userId }).select("*");
    return data;
  } catch (error) {
    throw error; // Re-throw the error to propagate it up the call stack
  }
};

exports.getUserByEmail = async (args, context) => {
  try {
    const { email } = args;
    const user = await knex(tables.USERS).where({ email }).select("*").first();
    return user;
  } catch (error) {
    throw error; // Re-throw the error to propagate it up the call stack
  }
};

exports.createUser = async (input, context) => {
  try {
    const user = await knex("users").returning("*").insert(input);
    return user[0];
  } catch (error) {
    throw error;
  }
};

exports.getAllUsers = async () => {
  const user = await knex("users").select("*");
  return user;
};

exports.updateUser = async ({ input }) => {
  const { userId, ...rest } = input;
  const userUpdate = await knex("users").where({ userId }).update(rest);
  return userUpdate;
};
exports.deleteUser = async ({ userId }) => {
  const deletedData = await knex("users").where({ userId }).del();
  return deletedData;
};
