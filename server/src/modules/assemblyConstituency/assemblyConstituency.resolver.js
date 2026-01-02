const AssemblyConstituencyControllers = require("../assemblyConstituency/assemblyConstituency.controllers");

const assemblyConstituencyResolvers = {
  Query: {
    getConstitutionsByDistricts:
      AssemblyConstituencyControllers.getConstitutionsByDistricts,
    getAssignedConstitutionsByDistricts:
      AssemblyConstituencyControllers.getAssignedConstitutionsByDistricts,
  },
  Mutation: {
    createassignedConstity:
      AssemblyConstituencyControllers.createassignedConstity,
  },
};
module.exports = assemblyConstituencyResolvers;
