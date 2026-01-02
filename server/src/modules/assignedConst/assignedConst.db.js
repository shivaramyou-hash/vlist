const knex = require("../../db/knex");
const tables = require("../../constants/tables");

exports.getAssignedConstitutionsByUser = async ({ userId }, context) => {
  try {
    const data = await knex("assignedConst")
      .leftJoin("states", "assignedConst.state", "states.stateCode")
      .leftJoin("districts", "assignedConst.district", "districts.districtCode")
      .leftJoin(
        "assemblyConst",
        "assignedConst.assemblyConst",
        "assemblyConst.assemblyConstCode"
      )
      .where("assignedConst.userId", userId)
      .select(
        "assignedConst.*",
        "states.stateName",
        "districts.districtName",
        "assemblyConst.assemblyConstName"
      );

    const pollingStationsExist = data.some(
      (row) =>
        Array.isArray(row.pollingStations) && row.pollingStations.length > 0
    );

    let pollingStationNamesMap = {};
    if (pollingStationsExist) {
      const pollingStationIds = data.map((row) => row.pollingStations).flat();

      const containsAllPollingStations = pollingStationIds.some(
        (id) => id === 0
      );

      if (containsAllPollingStations) {
        const allPollingStations = await knex("pollingStations").select(
          "pollingStationCode",
          "pollingStationName"
        );
        pollingStationNamesMap = allPollingStations.reduce((acc, curr) => {
          acc[curr.pollingStationCode] = curr.pollingStationName;
          return acc;
        }, {});
      } else {
        const pollingStationNames = await knex("pollingStations")
          .whereIn("pollingStationCode", pollingStationIds)
          .select("pollingStationCode", "pollingStationName");
        pollingStationNamesMap = pollingStationNames.reduce((acc, curr) => {
          acc[curr.pollingStationCode] = curr.pollingStationName;
          return acc;
        }, {});
      }
    }

    const mappedData = data.map((row) => {
      const pollingStations = row.pollingStations;
      const pollingStationNames = pollingStations.map((stationId) => {
        if (stationId === 0) {
          return "All";
        } else {
          return pollingStationNamesMap[stationId];
        }
      });

      return {
        userId: row.userId,
        district: row.district,
        districtName: row.districtName,
        assemblyConst: row.assemblyConst,
        assemblyConstName: row.assemblyConstName,
        pollingStations: pollingStations,
        pollingStationNames: pollingStationNames,
        state: row.state,
        stateName: row.stateName,
        writeAccess: row.writeAccess,
        id: row.id,
      };
    });

    return mappedData;
  } catch (error) {
    throw error;
  }
};

exports.getAssignedConstByUserId = async (userId, context) => {
  const data = await knex("assignedConst").select("*").where({
    userId,
  });

  return data;
};

exports.deleteAssignedConstituency = async ({ id }, context) => {
  const data = await knex("assignedConst")
    .where({
      id,
    })
    .delete();

  return data;
};
