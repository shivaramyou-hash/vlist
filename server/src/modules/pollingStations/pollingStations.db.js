const knex = require("../../db/knex");
const tables = require("../../constants/tables");

exports.getPollingStations = async (args, context) => {
  const { state, district, assemblyConst } = args; // Destructure args object to get state, district, and assemblyConst
  try {
    const data = await knex(tables.POLLING_STATIONS)
      .where("state", state)
      .where("district", district)
      .where("assemblyConst", assemblyConst)
      .select("*");
    return data;
  } catch (error) {
    throw error; // Re-throw the error to propagate it up the call stack
  }
};
// exports.getAssignedPollingStations = async (args, context) => {
//   const { state, district, assemblyConst, userId } = args.input;
//   try {
//     const assignedDetails = await knex(tables.ASSIGNED_CONST)
//       .where("state", state)
//       .where("district", district)
//       .where("assemblyConst", assemblyConst)
//       .where("userId", userId)
//       .select("*");
//     const pollingStationCodes = assignedDetails[0].pollingStations; // Assuming pollingStations is an array of integers

//     const pollingStationsData = await knex(tables.POLLING_STATIONS)
//       .where("state", state)
//       .where("district", district)
//       .where("assemblyConst", assemblyConst)
//       .whereIn("pollingStationCode", pollingStationCodes)
//       .select("*");
//     return pollingStationsData;
//   } catch (error) {
//     throw error; // Re-throw the error to propagate it up the call stack
//   }
// };

exports.getAssignedPollingStations = async (args, context) => {
  const { state, district, assemblyConst, userId } = args.input;
  try {
    const assignedDetails = await knex(tables.ASSIGNED_CONST)
      .where("state", state)
      .where("district", district)
      .where("assemblyConst", assemblyConst)
      .where("userId", userId)
      .select("*");

    let pollingstationsCode = assignedDetails[0].pollingStations;

    if (pollingstationsCode[0] === 0) {
      // Return total polling stations data
      const pollingStationsData = await knex(tables.POLLING_STATIONS)
        .where("state", state)
        .where("district", district)
        .where("assemblyConst", assemblyConst)
        .select("*");

      return pollingStationsData;
    } else {
      // Fetch data for assigned polling stations
      const pollingStationsData = await knex(tables.POLLING_STATIONS)
        .where("state", state)
        .where("district", district)
        .where("assemblyConst", assemblyConst)
        .whereIn("pollingStationCode", pollingstationsCode)
        .select("*");

      return pollingStationsData;
    }
  } catch (error) {
    throw error; // Re-throw the error to propagate it up the call stack
  }
};

exports.createPollingStations = async (input, context) => {
  try {
    // Sanitize inputs
    const stateArr = [...new Set(input.map((ps) => ps.state).filter(Boolean))];
    const districtArr = [
      ...new Set(
        input.map((ps) => parseInt(ps.district)).filter(Number.isInteger)
      ),
    ];
    const assemblyArr = [
      ...new Set(
        input.map((ps) => parseInt(ps.assemblyConst)).filter(Number.isInteger)
      ),
    ];

    // Fetch existing polling stations
    const existingPollingStations = await knex(tables.POLLING_STATIONS)
      .whereIn("state", stateArr)
      .whereIn("district", districtArr)
      .whereIn("assemblyConst", assemblyArr);

    const existingStationCodes = existingPollingStations.map(
      (pollingStation) => pollingStation.pollingStationCode
    );

    const updatedPollingStations = [];
    const newPollingStations = [];

    input.forEach((pollingStation) => {
      if (existingStationCodes.includes(pollingStation.pollingStationCode)) {
        updatedPollingStations.push(pollingStation);
      } else {
        newPollingStations.push(pollingStation);
      }
    });

    // Update and insert
    await Promise.all([
      ...updatedPollingStations.map(async (pollingStation) => {
        try {
          await knex(tables.POLLING_STATIONS)
            .where({
              pollingStationCode: pollingStation.pollingStationCode,
              state: pollingStation.state,
              district: pollingStation.district,
              assemblyConst: pollingStation.assemblyConst,
            })
            .update(pollingStation);
        } catch (error) {
          console.error(`Error updating polling station: ${error}`);
        }
      }),
      ...newPollingStations.map(async (pollingStation) => {
        try {
          await knex(tables.POLLING_STATIONS).insert(pollingStation);
        } catch (error) {
          console.error(`Error inserting new polling station: ${error}`);
        }
      }),
    ]);

    return { data: true };
  } catch (error) {
    throw error;
  }
};
