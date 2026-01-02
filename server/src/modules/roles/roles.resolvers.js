const { Mutation } = require("../users/users.resolver");
const RolesControllers = require("./roles.controller");

const rolesResolvers = {
  Query: {
    getRoles: RolesControllers.getRoles,
    getRoleById: RolesControllers.getRoleById,
  },
  Mutation: {
    createRole: RolesControllers.createRole,
    updateRole: RolesControllers.updateRole,
    deleteRole: RolesControllers.deleteRole,
  },
};

module.exports = rolesResolvers;
