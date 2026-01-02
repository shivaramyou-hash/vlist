import usersResolvers from "../modules/users/users.resolver";
import voterResolvers from "../modules/voter/voter.resolver";
import statesResolvers from "../modules/states/states.resolver";
import districtsResolvers from "../modules/districts/districts.resolver";
import rolesResolvers from "../modules/roles/roles.resolvers";
const AssemblyConstituenciesResolvers = require("../modules/assemblyConstituency/assemblyConstituency.resolver");
const pollingStationsResolvers = require("../modules/pollingStations/pollingStations.resolver");
const AssignedConst = require("../modules/assignedConst/assignedConst.resolver");
const ExtractetVoter = require("../modules/extractedVoterlist/extractedVoterlist.resolver");

const resolvers = {
  Query: {
    ...usersResolvers.Query,
    ...voterResolvers.Query,
    ...statesResolvers.Query,
    ...districtsResolvers.Query,
    ...AssemblyConstituenciesResolvers.Query,
    ...rolesResolvers.Query,
    ...pollingStationsResolvers.Query,
    ...AssignedConst.Query,
    ...ExtractetVoter.Query,
  },
  //   assignedConst: {
  //     stateData: async (_) => {
  //       console.log("text");
  //       const data =  await knex("states")
  //         .where("stateCode", _.state)
  //         // .first()
  //         .select("stateName");
  //         console.log(data,"data");
  //         return data;
  //     },
  // },

  Mutation: {
    ...usersResolvers.Mutation,
    ...voterResolvers.Mutation,
    ...statesResolvers.Mutation,
    ...districtsResolvers.Mutation,
    ...AssemblyConstituenciesResolvers.Mutation,
    ...rolesResolvers.Mutation,
    ...pollingStationsResolvers.Mutation,
    ...AssignedConst.Mutation,
    ...ExtractetVoter.Mutation,
  },
};

module.exports = resolvers;
