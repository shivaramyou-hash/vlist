/* eslint-disable react-hooks/exhaustive-deps */

import { Typography } from '@mui/material';
import { Card, Grid, Alert } from '@mui/material/';
import TextFields from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSelector } from 'react-redux';
import { HrmYellowSubmitBtn } from '../../../components/Button/Buttons';
import SelectDropdown from '../../../components/Inputs/SelectDropdownComponent';
import TextField from '../../../components/Inputs/TextFieldComponent';
import { useTranslation } from 'react-i18next';
import InputAdornment from '@mui/material/InputAdornment';
import './CreateUser.css';
import useCreateUserValidation from '../../../core/Validations/useCreateUserValidation';
import useUsers from './useUsers';
import AutocompleteDropdown from '@/components/Inputs/AutocompleteDropdown';

const CreateUser = () => {
  const { t } = useTranslation('translations');
  const { createUser, getAllRoles, rolesData } = useUsers();
  const user = useSelector((state) => state.user.userData);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    getAllRoles();
  }, []);

  const rolesOptions = rolesData?.getRoles?.map((i) => ({
    label: i.role,
    value: i.roleId,
  }));

  const portalRoles = [
    {
      Id: 1,
      name: 'Primary Admin',
    },
    {
      Id: 2,
      name: 'Admin',
    },
    {
      Id: 3,
      name: 'User',
    },
  ];

  const portalRoleOptions = portalRoles?.map((i) => ({
    label: i.name,
    value: i.Id,
  }));
  const OnCreate = () => {
    const variables = {
      input: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        password: values.password,
        role: +values?.role,
        portalRole: +values?.portalRole,
      },
    };

    createUser({ variables });
  };

  const { handleChange, handleSubmit, values, errors } =
    useCreateUserValidation({
      callback: OnCreate,
    });

  return (
    <Card>
      <Grid sx={{ margin: 2 }}>
        <Typography variant="h4" className="job-title">
          {t('CREATE_USER')}
        </Typography>
      </Grid>
      <hr />

      <Grid m={2} container>
        {/* Section for First Name */}
        <Grid item xs={12} sm={6} md={6} container alignItems={'center'} my={1}>
          <Grid item xs={12} sm={5} md={5}>
            <Typography>
              {t('First Name')} <span className="title-imp">*</span>:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              type="text"
              name="firstName"
              placeholder={t('First Name')}
              value={values.firstName}
              error={errors.firstName}
              style={{ marginBottom: '5px' }}
              helpertext={errors.firstName}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* Section for Last Name */}
        <Grid item xs={12} sm={6} md={6} container alignItems={'center'} my={1}>
          <Grid item xs={12} sm={5} md={5}>
            <Typography>
              {t('Last Name')} <span className="title-imp">*</span>:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              type="text"
              name="lastName"
              placeholder={t('Last Name')}
              value={values.lastName}
              error={errors.lastName}
              style={{ marginBottom: '5px' }}
              helpertext={errors.lastName}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* Section for Mobile Number */}
        <Grid item xs={12} sm={6} md={6} container alignItems={'center'} my={1}>
          <Grid item xs={12} sm={5} md={5}>
            <Typography>
              {t('Mobile No')} <span className="title-imp">*</span>:{' '}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              name="phone"
              value={values?.phone || ''}
              error={errors.phone}
              helpertext={errors.phone}
              placeholder="XXXXX XXXXX"
              inputProps={{ maxLength: 12, autoComplete: 'off' }}
              style={{ marginBottom: '5px' }}
              onChange={handleChange}
              type="number"
            />
          </Grid>
        </Grid>

        {/* Section for Email Id */}
        <Grid item xs={12} sm={6} md={6} container alignItems={'center'} my={1}>
          <Grid item xs={12} sm={5} md={5}>
            <Typography>
              {t('Email Id')} <span className="title-imp">*</span>:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              type="text"
              value={values.email}
              error={errors.email}
              style={{ marginBottom: '5px' }}
              helpertext={errors.email}
              onChange={handleChange}
              name="email"
              placeholder="Email Id"
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={6} container alignItems={'center'} my={1}>
          <Grid item xs={12} sm={5} md={5}>
            <Typography>
              {t('Portal Role')} <span className="title-imp">*</span>:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <SelectDropdown
              value={values.portalRole}
              error={errors.portalRole}
              style={{ marginBottom: '5px' }}
              helpertext={errors.portalRole}
              onChange={handleChange}
              options={portalRoleOptions || []}
              name="portalRole"
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={6} container alignItems={'center'} my={1}>
          <Grid item xs={12} sm={5} md={5}>
            <Typography>
              {t('Role')} <span className="title-imp">*</span>:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <SelectDropdown
              value={values.role}
              error={errors.role}
              style={{ marginBottom: '5px' }}
              helpertext={errors.role}
              onChange={handleChange}
              name="role"
              options={rolesOptions || []}
            />
          </Grid>
        </Grid>

        {/* Section for Password */}
        <Grid item xs={12} sm={6} md={6} container alignItems={'center'} my={1}>
          <Grid item xs={12} sm={5} md={5}>
            <Typography>
              {t('PASSWORD')} <span className="title-imp">*</span>:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextFields
              type={showPass ? 'text' : 'password'}
              name="password"
              className="eyetextfield"
              value={values?.password || ''}
              error={errors.password}
              placeholder="Password"
              onChange={handleChange}
              autoComplete="off"
              sx={
                errors.password
                  ? { borderColor: '#C32525' }
                  : { marginBottom: '5px' }
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)}>
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && (
              <span className="password-error">{errors.password}</span>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid m={2} align="right" className="submitbutton">
        <HrmYellowSubmitBtn label={t('Submit')} onClick={handleSubmit} />
      </Grid>
    </Card>
  );
};
export default CreateUser;
