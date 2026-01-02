const knex = require("../../db/knex");
const tables = require("../../constants/tables");

exports.getAllStates = async (context) => {
  try {
    const data = await knex(tables.STATES).select("*");
    return data;
  } catch (error) {
    throw error; // Re-throw the error to propagate it up the call stack
  }
};
