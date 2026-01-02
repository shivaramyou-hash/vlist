require("dotenv").config();
const { authMiddleware } = require("../../utilities/authMiddleware");
const AssignedConstDB = require("../assignedConst/assignedConst.db");

exports.getAssignedConstitutionsByUser = async (_, args, context) => {
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;
  const data = await AssignedConstDB.getAssignedConstitutionsByUser(
    args,
    context
  );
  return data;
};

exports.deleteAssignedConstituency = async (_, args, context) => {
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;
  return await AssignedConstDB.deleteAssignedConstituency(args, context);
};
