const AssignedConstControllers = require("../assignedConst/assignedConst.controllers");

const assignedConstResolvers = {
  Query: {
    getAssignedConstitutionsByUser:
      AssignedConstControllers.getAssignedConstitutionsByUser,
  },
  Mutation: {
    deleteAssignedConstituency:
      AssignedConstControllers.deleteAssignedConstituency,
  },
};
module.exports = assignedConstResolvers;
