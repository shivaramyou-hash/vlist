require("dotenv").config();
const { parse } = require("path");
const { authMiddleware } = require("../../utilities/authMiddleware");
// const VoterDB = require("./voter.db");
const PollingStationsDB = require("./pollingStations.db");

exports.createPollingStations = async (_, args, context) => {
  try {
    const parsedData = JSON.parse(args.input.data);
    const extractedDataArray = parsedData.map((psName) => {
      return {
        pollingStationCode: +psName["PS No"],
        pollingStationName: psName["PS Name"],
        pollingStationAddress: psName["PS Address"],
        state: psName["state"],
        district: +psName["district"],
        assemblyConst: +psName["const code"],
      };
    });

    const result = await PollingStationsDB.createPollingStations(
      extractedDataArray,
      context
    );
    return result;
  } catch (error) {
    throw error; // Re-throw the error to propagate it up the call stack
  }
};

exports.getPollingStations = async (_, args, context) => {
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;

  const data = await PollingStationsDB.getPollingStations(args, context);
  return data;
};
exports.getAssignedPollingStations = async (_, args, context) => {
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;

  const data = await PollingStationsDB.getAssignedPollingStations(
    args,
    context
  );
  return data;
};
