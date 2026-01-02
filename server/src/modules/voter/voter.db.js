const knex = require("../../db/knex");
const tables = require("../../constants/tables");
const { GraphQLError } = require("graphql");

exports.getAllVoters = async () => {
  try {
    const voters = await knex(tables.VOTER).select("*").first(500);
    return voters;
  } catch (error) {
    return null;
  }
};
exports.getVotersByPollingStation = async (
  {
    tableName, // Pass tableName directly
  },
  context
) => {
  try {
    const voters = await knex(tableName).select("*");
    return voters;
  } catch (error) {
    return null;
  }
};
exports.getVotersAccessByPollingStation = async (
  {
    tableName, // Pass tableName directly
  },
  context
) => {
  try {
    const voters = await knex(tableName).select("*");
    return voters;
  } catch (error) {
    return null;
  }
};

exports.getTablesName = async (args, context) => {
  const { state, district, assemblyConst, pollingStationCode } = args.input;

  try {
    const result = await knex(tables.REFERENCE_TABLE).select("*").where({
      state: state,
      district: district,
      assemblyConstCode: assemblyConst,
      psNo: pollingStationCode,
    });

    return result;
  } catch (error) {
    return null;
  }
};

exports.createVoter = async (data, context) => {
  const updatedEPICs = [];
  const createdEPICs = [];

  try {
    const state = data[0].state;
    const district = +data[0].district;
    const assemblyConst = +data[0].assemblyConst;

    const tableNamePrefix = `${state}-${district}-${assemblyConst}`;

    await knex.transaction(async (trx) => {
      await Promise.all(
        data.map(async (item) => {
          const tableName = `${tableNamePrefix}-${item.psNo}`;
          const tableExists = await trx.schema.hasTable(tableName);

          if (!tableExists) {
            try {
              const createTablePromise = new Promise((resolve, reject) => {
                knex.schema
                  .createTable(tableName, (t) => {
                    t.increments("id").notNullable().primary();
                    t.string("psNo");
                    t.string("psName", 2000);
                    t.string("psAddress", 2000);
                    t.string("SLNo");
                    t.string("voterName", 2000);
                    t.string("houseNumber", 2000);
                    t.string("address", 2000);
                    t.string("relationType");
                    t.string("relativeName");
                    t.string("age");
                    t.string("gender");
                    t.string("EPIC");
                    t.string("mobileNumber");
                    t.integer("district");
                    t.string("state");
                    t.integer("assemblyConst");
                    t.string("status");
                    t.boolean("isDeleted");
                    t.string("notes");
                  })
                  .then(() => {
                    resolve();
                  })
                  .catch((error) => {
                    reject(error);
                  });
              });

              await createTablePromise;

              await trx(tables.REFERENCE_TABLE).insert({
                psNo: item.psNo,
                tableName: tableName,
                assemblyConstCode: assemblyConst,
                district: district,
                state: state,
              });
            } catch (error) {
              throw new GraphQLError(error.message, {
                extensions: {
                  code: "CONFLICT",
                },
              });
            }
          }

          const existingRecord = await trx(tableName)
            .where("EPIC", item.EPIC)
            .first();

          if (existingRecord) {
            await trx(tableName).where("EPIC", item.EPIC).update(item);
            updatedEPICs.push(item.EPIC);
          } else {
            await trx(tableName).insert(item);
            createdEPICs.push(item.EPIC);
          }
        })
      );
    });

    return { createdEPICs, updatedEPICs };
  } catch (error) {
    throw error;
  }
};

exports.updateSingleVoter = async (args, context) => {
  try {
    const { state, district, assemblyConst, psNo, data } = args.input;
    const voterData = JSON.parse(data);
    delete voterData["__typename"];

    const tableName = `${state}-${district}-${assemblyConst}-${psNo}`;
    const tableExists = await knex.schema.hasTable(tableName);

    if (tableExists) {
      // Update data in the determined table
      const result = await knex(tableName)
        .where({
          id: voterData.id,
        })
        .update(voterData);

      return result === 1;
    } else {
      return { success: false, message: "Table does not exist" };
    }
  } catch (error) {
    throw error;
  }
};
