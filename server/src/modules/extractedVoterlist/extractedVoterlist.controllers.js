require("dotenv").config();
const { authMiddleware } = require("../../utilities/authMiddleware");
const ExtractedVoterDB = require("./extractedVoterlist.db");

exports.getExtractedVoterListByUserId = async (_, args, context) => {
  const { userId } = args;
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;
  return await ExtractedVoterDB.getExtractedVoterListByUserId(userId, context);
};
