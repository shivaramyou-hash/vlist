import React from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CREATE_ROLES,
  GET_ROLES,
  GET_ROLE_BY_ID,
  UPDATE_ROLE,
  DELETE_ROLE,
} from '../../../services/mutations';
import toast from '../../../components/Toast';
import { useTranslation } from 'react-i18next';

const useRoles = () => {
  const [createRoles] = useMutation(CREATE_ROLES, {
    fetchPolicy: 'network-only',
    refetchQueries: [
      { query: GET_ROLES }, // DocumentNode object parsed with gql
    ],
    onCompleted: (res) => {
      toast.success('Roles created sucessfully');
    },
    onError: (error) => {
      toast.error(`${t('ERROR')}`);
    },
  });

  const [updateRole] = useMutation(UPDATE_ROLE, {
    fetchPolicy: 'network-only',
    refetchQueries: [
      { query: GET_ROLES }, // DocumentNode object parsed with gql
    ],
    onCompleted: (res) => {
      toast.success('Role updated sucessfully');
    },
    onError: (error) => {
      toast.error(`${t('ERROR')}`);
    },
  });

  const [deleteRole] = useMutation(DELETE_ROLE, {
    refetchQueries: [
      { query: GET_ROLES }, // DocumentNode object parsed with gql
    ],
    fetchPolicy: 'network-only',
    onCompleted: (res) => {
      toast.success('Role deleted sucessfully');
    },
    onError: (error) => {
      toast.error(`${t('ERROR')}`);
    },
  });
  const [getAllRoles, { loading: rolesLoad, data: rolesData }] =
    useLazyQuery(GET_ROLES);

  const [getRoleById, { data: roleByIdData, loading: roleByIdLoad }] =
    useLazyQuery(GET_ROLE_BY_ID, {
      fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    });
  return {
    createRoles,
    getAllRoles,
    rolesData,
    roleByIdData,
    getRoleById,
    updateRole,
    deleteRole,
    loading: rolesLoad || roleByIdLoad,
  };
};

export default useRoles;
