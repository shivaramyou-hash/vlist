require("dotenv").config();
const { authMiddleware } = require("../../utilities/authMiddleware");
const RoleDB = require("./roles.db");

exports.createRole = async (_, args, context) => {
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;

  const { multipleRoles } = args.input;

  // Create an array to store promises for each role creation
  const rolePromises = multipleRoles.roles.map(async (role) => {
    return RoleDB.createRole(
      {
        input: {
          role: role,
        },
      },
      context
    );
  });

  // Use Promise.all() to execute all promises concurrently
  const createdRoles = await Promise.all(rolePromises);

  return createdRoles;
};

exports.getRoles = async (_, args, context) => {
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;
  return await RoleDB.getRoles();
};

exports.getRoleById = async (_, args, context) => {
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;

  return await RoleDB.getRoleById(args);
};

exports.updateRole = async (_, args, context) => {
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;

  return await RoleDB.updateRole(args);
};

exports.deleteRole = async (_, args, context) => {
  const { isValid } = await authMiddleware(context);
  if (!isValid) return;
  return await RoleDB.deleteRole(args);
};
