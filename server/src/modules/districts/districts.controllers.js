require("dotenv").config();
const { authMiddleware } = require("../../utilities/authMiddleware");
const DistrictsDB = require("./districts.db");

exports.getDistrictsByState = async (_, args, context) => {
  const { stateCode } = args;
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;
  return await DistrictsDB.getDistrictsByState(stateCode, context);
};
