const StatesControllers = require("../states/states.controllers");

const statesResolvers = {
  Query: {
    getAllStates: StatesControllers.getAllStates,
  },
  Mutation: {},
};
module.exports = statesResolvers;
