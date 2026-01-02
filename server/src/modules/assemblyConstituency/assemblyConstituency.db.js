const knex = require("../../db/knex");
const tables = require("../../constants/tables");

exports.getConstitutionsByDistricts = async (
  { stateCode, districtCode },
  context
) => {
  try {
    const data = await knex(tables.ASSEMBLYCONSTITUENCIES)
      .where("stateCode", stateCode)
      .where("districtCode", districtCode)
      .select("*");
    return data;
  } catch (error) {
    throw error; // Re-throw the error to propagate it up the call stack
  }
};
exports.getAssignedConstitutionsByDistricts = async (args, context) => {
  try {
    const { stateCode, districtCode, userId } = args;
    const assignedConstData = await knex(tables.ASSIGNED_CONST)
      .where("userId", userId)
      .select("*");

    const assemblyConstIds = assignedConstData.map(
      (detail) => detail.assemblyConst
    );

    const constituenciesData = await knex(tables.ASSEMBLY_CONST)
      .whereIn("assemblyConstCode", assemblyConstIds)
      .where("stateCode", stateCode)
      .where("district", districtCode)
      .select("*");
    return constituenciesData;
  } catch (error) {
    throw error; // Re-throw the error to propagate it up the call stack
  }
};

exports.createassignedConstity = async ({ input }, context) => {
  const { state, district, assemblyConst } = input;

  // Check if a record with the same state, district, and assemblyConst exists
  const existingRecord = await knex(tables.ASSIGNED_CONST)
    .where("state", state)
    .where("district", district)
    .where("assemblyConst", assemblyConst)
    .first();

  if (existingRecord) {
    // Update the existing record
    const [updatedRecord] = await knex(tables.ASSIGNED_CONST)
      .where("state", state)
      .where("district", district)
      .where("assemblyConst", assemblyConst)
      .returning("*")
      .update(input);
    return updatedRecord;
  } else {
    // Insert a new record
    const [newRecord] = await knex(tables.ASSIGNED_CONST)
      .returning("*")
      .insert(input);

    return newRecord;
  }
};
