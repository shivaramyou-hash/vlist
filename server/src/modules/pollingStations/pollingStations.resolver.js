const PollingStationsControllers = require("./pollingStations.controllers");

const voterResolvers = {
  Query: {
    getPollingStations: PollingStationsControllers.getPollingStations,
    getAssignedPollingStations:
      PollingStationsControllers.getAssignedPollingStations,
  },
  Mutation: {
    createPollingStations: PollingStationsControllers.createPollingStations,
  },
};
module.exports = voterResolvers;
