require("dotenv").config();
const { parse } = require("path");
const { authMiddleware } = require("../../utilities/authMiddleware");
const VoterDB = require("./voter.db");
const { table } = require("console");
const AssignedConstDB = require("../assignedConst/assignedConst.db");
exports.getAllVoters = async (_, args, context) => {
  // const { isValid } = await authMiddleware(context);
  // if (!isValid) return;
  const data = await VoterDB.getAllVoters(context);
  return data;
};

exports.getVotersByPollingStation = async (_, args, context) => {
  // const { isValid } = await authMiddleware(context);
  // if (!isValid) return;

  const tableData = await VoterDB.getTablesName(args, context);

  const data = await VoterDB.getVotersByPollingStation(
    {
      tableName: tableData[0].tableName, // Pass tableName directly
    },
    context
  );
  return data; // Return the fetched data
};

exports.getVotersAccessByPollingStation = async (_, args, context) => {
  // const { isValid } = await authMiddleware(context);
  // if (!isValid) return;

  const { userId, pollingStationCode } = args.input;

  const assignedConstData = await AssignedConstDB.getAssignedConstByUserId(
    userId,
    context
  );

  const writeAccess = assignedConstData.some(
    (i) =>
      i.writeAccess.includes(0) || i.writeAccess.includes(pollingStationCode)
  );

  const tableData = await VoterDB.getTablesName(args, context);

  const data = await VoterDB.getVotersAccessByPollingStation(
    {
      tableName: tableData[0].tableName, // Pass tableName directly
    },
    context
  );

  return { voters: data, writeAccess: writeAccess }; // Return the fetched data
};

exports.createVoter = async (_, args, context) => {
  try {
    // const { isValid } = await authMiddleware(context);
    // if (!isValid) return;
    const parsedData = JSON.parse(args.input.data);
    const extractedDataArray = parsedData.map((psName) => {
      return {
        psNo: psName["PS No"],
        psName: psName["PS Name"],
        psAddress: psName["PS Address"],
        SLNo: psName["Sl. No"],
        voterName: psName["Voter Name"],
        houseNumber: psName["House Number"],
        address: psName["Address"],
        relationType: psName["Relation Type"],
        relativeName: psName["Relative Name"],
        age: psName["Age"],
        gender: psName["Gender"],
        EPIC: psName["EPIC"],
        mobileNumber: psName["Mobile Number"],
        district: args.input.district,
        state: args.input.state,
        assemblyConst: args.input.assemblyConst,
      };
    });

    const result = await VoterDB.createVoter(extractedDataArray, context);
    return result;
  } catch (error) {
    throw error;
  }
};
exports.updateSingleVoter = async (_, args, context) => {
  try {
    // const { isValid } = await authMiddleware(context);
    // if (!isValid) return;

    const result = await VoterDB.updateSingleVoter(args, context);
    return result;
  } catch (error) {
    throw error;
  }
};
