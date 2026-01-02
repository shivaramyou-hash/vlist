const knex = require("../../db/knex");
const tables = require("../../constants/tables");

exports.getExtractedVoterListByUserId = async (userId, context) => {
  try {
    const data = await knex(tables.EXTRACTED_INPUT)
      .where("userId", userId)
      .select("*");
    return data;
  } catch (error) {
    throw error; // Re-throw the error to propagate it up the call stack
  }
};
