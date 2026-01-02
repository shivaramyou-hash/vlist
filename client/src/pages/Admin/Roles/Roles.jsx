import { Card, Grid, Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import TextFieldComponent from '@/components/Inputs/TextFieldComponent';
import { HrmYellowBtn, HrmYellowSubmitBtn } from '@/components/Button/Buttons';
import toast from '../../../components/Toast';
import useRoles from './useRoles';
import PaginationTable from '@/components/Table/pagination';
import { roleCols, roleClickable } from '@/components/Table';

const Roles = () => {
  const { t } = useTranslation('translations');
  const [rolesError, setRolesError] = useState([]);
  const [roles, setRoles] = useState(['']);
  const { createRoles, getAllRoles, rolesData, loading } = useRoles();

  useEffect(() => {
    getAllRoles();
  }, []);

  const allRoles = rolesData?.getRoles;

  const handleRoleChange = (index, event) => {
    const { value } = event.target;
    const updatedRoles = [...roles];
    updatedRoles[index] = value;
    setRoles(updatedRoles);
    setRolesError((prevErrors) => {
      const newErrors = [...prevErrors];

      // Set error if the value is empty
      if (!value?.trim()) {
        newErrors[index] = 'Role is required';
      } else {
        newErrors[index] = ''; // Reset role error
      }

      return newErrors;
    });
  };

  const handleAddRole = () => {
    // Check if the last role is not empty before adding a new one
    if (roles.length === 0 || roles[roles.length - 1].trim() !== '') {
      setRoles([...roles, '']);
    } else {
      toast.error('Please complete the current role before adding a new one.');

      // Set an error for the last role
      setRolesError((prevErrors) => {
        const newErrors = [...prevErrors];
        const lastRoleIndex = roles.length - 1;

        // Set an error message for the last role
        newErrors[lastRoleIndex] = 'Role is required';

        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    let isValid = true;

    // Validate roles
    const roleSet = new Set(roles);
    const rolesErrorArray = Array(roles.length).fill('');

    roles.forEach((role, index) => {
      if (role === '') {
        rolesErrorArray[index] = 'Role is required';
        isValid = false;
      }
    });

    if (isValid) {
      // Check for duplicate roles
      if (roles.length !== roleSet.size) {
        const seenRoles = new Set();
        roles.forEach((role, index) => {
          if (seenRoles.has(role)) {
            rolesErrorArray[index] = 'Duplicate roles are not allowed';
            isValid = false;
          } else {
            seenRoles.add(role);
          }
        });
      }
    }

    setRolesError(rolesErrorArray);

    // Submit if valid
    if (isValid) {
      const variables = {
        input: {
          multipleRoles: {
            roles: roles,
          },
        },
      };

      createRoles({ variables }).then(() => {
        // Reset variables after successful submission
        setRoles(['']);
      });
    } else {
      toast.error('Please fill out all the fields');
    }
  };

  return (
    <Card>
      <Grid item xs={12} sm={12} md={12} m={1}>
        <Typography variant="h6" className="screen-title" px={2}>
          {t('ROLES')}
        </Typography>
      </Grid>
      <hr />
      <Grid container className="main-grid" spacing={2} p={2}>
        <Grid
          item
          xs={12}
          md={12}
          align="right"
          style={{ marginRight: '6px', marginTop: '4px' }}
        ></Grid>

        {roles.map((role, index) => (
          <Grid item xs={4} key={index} display="flex" alignItems="center">
            <TextFieldComponent
              name="role"
              placeholder={`Role ${index + 1}`}
              value={role || ''}
              onChange={(event) => handleRoleChange(index, event)} // Pass role ID
              error={rolesError[index]}
              helpertext={rolesError[index]}
            />
          </Grid>
        ))}

        <Grid item xs={2} display="flex" alignItems="center">
          <HrmYellowBtn
            onClick={handleAddRole}
            variant="contained"
            label={'Add Roles'}
            fullWidth
          />
        </Grid>

        <Grid item align={'right'} xs={12}>
          <HrmYellowSubmitBtn label={'Submit'} onClick={handleSubmit} />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h6" className="screen-title" px={2}>
          {t('Existing Roles')}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center' }} p={2}>
        <PaginationTable
          colsData={roleCols}
          rowsData={allRoles}
          clickable={roleClickable}
        />
      </Grid>
    </Card>
  );
};

export default Roles;
