import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: String) {
    getUserById(userId: $userId) {
      userId
      firstName
      password
      isActive
      email
      lastName
      phone
      role
      portalRole
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: updateUserInput) {
    updateUser(input: $input)
  }
`;

export const USER_LOGIN = gql`
  query UserLogin($email: String, $password: String, $orgId: Int) {
    userLogin(email: $email, password: $password, orgId: $orgId) {
      Token
      message
      userData {
        userId
        firstName
        password
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      userId
      firstName
      password
      isActive
      email
      lastName
      portalRole
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: createUserInput) {
    createUser(input: $input) {
      userId
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: String) {
    deleteUser(userId: $userId)
  }
`;
