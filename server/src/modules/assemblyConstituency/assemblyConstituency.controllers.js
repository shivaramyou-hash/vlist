require("dotenv").config();
const { authMiddleware } = require("../../utilities/authMiddleware");
const AssemblyConstituencyDB = require("../assemblyConstituency/assemblyConstituency.db");

exports.getConstitutionsByDistricts = async (_, args, context) => {
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;
  return await AssemblyConstituencyDB.getConstitutionsByDistricts(
    args,
    context
  );
};
exports.getAssignedConstitutionsByDistricts = async (_, args, context) => {
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;
  const data = await AssemblyConstituencyDB.getAssignedConstitutionsByDistricts(
    args,
    context
  );
  return data;
};

exports.createassignedConstity = async (_, args, context) => {
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;
  return await AssemblyConstituencyDB.createassignedConstity(args, context);
};
