const ExtractedVoterControllers = require("../extractedVoterlist/extractedVoterlist.controllers");

const extractedVoterResolvers = {
  Query: {
    getExtractedVoterListByUserId:
      ExtractedVoterControllers.getExtractedVoterListByUserId,
  },
  Mutation: {},
};
module.exports = extractedVoterResolvers;
