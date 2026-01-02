const knex = require("../../db/knex");
const tables = require("../../constants/tables");
const { content } = require("googleapis/build/src/apis/content");

exports.createRole = async ({ input }, context) => {
  try {
    const role = await knex("roles").returning("*").insert(input);
    return role[0];
  } catch (error) {
    throw error;
  }
};

exports.getRoles = async () => {
  const roles = await knex("roles").select("*");
  return roles;
};

exports.getRoleById = async ({ roleId }) => {
  const roles = await knex("roles").where({ roleId }).select("*").first();

  return roles;
};

exports.updateRole = async ({ input }) => {
  const { roleId, ...rest } = input;
  const isUpdate = await knex("roles").where({ roleId }).update(rest);

  return isUpdate;
};

exports.deleteRole = async ({ roleId }) => {
  const isDelete = await knex("roles").where({ roleId }).delete();
  return isDelete;
};
