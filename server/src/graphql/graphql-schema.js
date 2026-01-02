const { GraphQLJSON } = require("graphql-type-json");
const Users = require("../../src/modules/users/users.schema");
const Voter = require("../../src/modules/voter/voter.schema");
const States = require("../../src/modules/states/states.schema");
const Districts = require("../../src/modules/districts/districts.schema");
const AssemblyConstituencies = require("../modules/assemblyConstituency/assemblyConstituency.schema");
const Roles = require("../../src/modules/roles/roles.schema");
const pollingStations = require("../modules/pollingStations/pollingStations.schema");
const AssignedConst = require("../modules/assignedConst/assignedConst.schema");
const ExtractetVoter = require("../modules/extractedVoterlist/extractedVoterlist.schema");

const types = [];
const queries = [];
const mutations = [];

const schemas = [
  Users,
  Voter,
  States,
  Districts,
  AssemblyConstituencies,
  Roles,
  pollingStations,
  AssignedConst,
  ExtractetVoter,
];

schemas.forEach((s) => {
  types.push(s.types);
  queries.push(s.queries);
  mutations.push(s.mutations);
});

const typeDefs = `
  scalar JSON
  scalar JSONObject
  ${types.join("\n")}


  
  type Query {
    ${queries.join("\n")}
    
  }
  type Mutation {
    ${mutations.join("\n")}
  }


`;
module.exports = typeDefs;
