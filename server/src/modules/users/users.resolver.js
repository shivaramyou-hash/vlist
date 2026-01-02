const UsersControllers = require("./users.controllers");

const userResolvers = {
  Query: {
    getUserById: UsersControllers.getUserById,
    userLogin: UsersControllers.userLogin,
    getAllUsers: UsersControllers.getAllUsers,
  },
  Mutation: {
    createUser: UsersControllers.createUser,
    updateUser: UsersControllers.updateUser,
    deleteUser: UsersControllers.deleteUser,
  },
};
module.exports = userResolvers;
