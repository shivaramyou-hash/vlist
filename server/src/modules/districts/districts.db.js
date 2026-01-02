const knex = require("../../db/knex");
const tables = require("../../constants/tables");

exports.getDistrictsByState = async (stateCode, context) => {
  try {
    const data = await knex(tables.DISTRICTS)
      .where("stateCode", stateCode)
      .select("*");
    return data;
  } catch (error) {
    throw error; // Re-throw the error to propagate it up the call stack
  }
};
