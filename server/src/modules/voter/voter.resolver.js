const VoterControllers = require("./voter.controllers");

const voterResolvers = {
  Query: {
    getAllVoters: VoterControllers.getAllVoters,
    getVotersByPollingStation: VoterControllers.getVotersByPollingStation,
    getVotersAccessByPollingStation:
      VoterControllers.getVotersAccessByPollingStation,
  },
  Mutation: {
    createVoter: VoterControllers.createVoter,
    updateSingleVoter: VoterControllers.updateSingleVoter,
  },
};
module.exports = voterResolvers;
