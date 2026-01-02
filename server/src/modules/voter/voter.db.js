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

exports.createVoter = async (rows) => {
  const createdEPICs = [];
  const updatedEPICs = [];

  if (!rows || rows.length === 0) {
    return { createdEPICs, updatedEPICs };
  }

  const state = rows[0].state;
  const district = Number(rows[0].district);
  const assemblyConst = Number(rows[0].assemblyConst);

  // SAFE table prefix (NO hyphens)
  const tablePrefix = `${state}_${district}_${assemblyConst}`;

  await knex.transaction(async (trx) => {
    /**
     * ---------------------------------------------------
     * 1️⃣ GROUP DATA BY psNo (VERY IMPORTANT)
     * ---------------------------------------------------
     */
    const psGroups = {};
    for (const row of rows) {
      if (!psGroups[row.psNo]) {
        psGroups[row.psNo] = [];
      }
      psGroups[row.psNo].push(row);
    }

    /**
     * ---------------------------------------------------
     * 2️⃣ CREATE TABLES SAFELY (ONCE PER psNo)
     * ---------------------------------------------------
     */
    for (const psNo of Object.keys(psGroups)) {
      const tableName = `${tablePrefix}_${psNo}`;

      // 🔒 Advisory lock (prevents pg_type race condition)
      await trx.raw(
        `SELECT pg_advisory_xact_lock(hashtext(?))`,
        [tableName]
      );

      const exists = await trx.schema.hasTable(tableName);

      if (!exists) {
        console.log("Creating table:", tableName);

        await trx.schema.createTable(tableName, (t) => {
          t.increments("id").primary();
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
          t.string("EPIC").unique(); // 🔑 IMPORTANT
          t.string("mobileNumber");
          t.integer("district");
          t.string("state");
          t.integer("assemblyConst");
          t.string("status");
          t.boolean("isDeleted").defaultTo(false);
          t.string("notes");
          t.timestamps(true, true);
        });

        // ✅ Reference table insert (NOW GUARANTEED)
        await trx(tables.REFERENCE_TABLE).insert({
          psNo,
          tableName,
          assemblyConstCode: assemblyConst,
          district,
          state,
        });
      }
    }

    /**
     * ---------------------------------------------------
     * 3️⃣ INSERT / UPDATE VOTERS (UPSERT LOGIC)
     * ---------------------------------------------------
     */
    for (const psNo of Object.keys(psGroups)) {
      const tableName = `${tablePrefix}_${psNo}`;
      const voters = psGroups[psNo];

      for (const voter of voters) {
        const existing = await trx(tableName)
          .where({ EPIC: voter.EPIC })
          .first();

        if (existing) {
          await trx(tableName)
            .where({ EPIC: voter.EPIC })
            .update(voter);

          updatedEPICs.push(voter.EPIC);
        } else {
          await trx(tableName).insert(voter);
          createdEPICs.push(voter.EPIC);
        }
      }
    }
  });

  return {
    createdEPICs,
    updatedEPICs,
  };
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
