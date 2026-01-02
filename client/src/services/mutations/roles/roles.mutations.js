import { gql } from '@apollo/client';

export const CREATE_ROLES = gql`
  mutation CreateRole($input: createRolesInput) {
    createRole(input: $input) {
      roleId
    }
  }
`;

export const GET_ROLES = gql`
  query GetRoles {
    getRoles {
      roleId
      role
    }
  }
`;

export const GET_ROLE_BY_ID = gql`
  query GetRoleById($roleId: Int) {
    getRoleById(roleId: $roleId) {
      roleId
      role
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation UpdateRole($input: updateRoleInput) {
    updateRole(input: $input)
  }
`;

export const DELETE_ROLE = gql`
  mutation DeleteRole($roleId: Int) {
    deleteRole(roleId: $roleId)
  }
`;
