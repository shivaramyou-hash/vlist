/* eslint-disable react-hooks/exhaustive-deps */

import { Typography } from '@mui/material';
import { Card, Grid, Alert } from '@mui/material/';
import TextFields from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSelector } from 'react-redux';
import {
  HrmDeleteBtn,
  HrmYellowSubmitBtn,
} from '../../../components/Button/Buttons';
import SelectDropdown from '../../../components/Inputs/SelectDropdownComponent';
import TextField from '../../../components/Inputs/TextFieldComponent';
import { useTranslation } from 'react-i18next';
import InputAdornment from '@mui/material/InputAdornment';
import './CreateUser.css';
import useCreateUserValidation from '../../../core/Validations/useCreateUserValidation';
import useUsers from './useUsers';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmAction from '@/components/Modal/ConfirmModal';

const EditUser = () => {
  const { t } = useTranslation('translations');
  const { createUser } = useUsers();
  const user = useSelector((state) => state.user.userData);
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const [disable, setDisable] = useState(true);
  const [initialValues, setInitialValues] = useState();

  const {
    getUserByUserId,
    userDataLoad,
    userData,
    updateUser,
    getAllRoles,
    rolesData,
  } = useUsers();

  useEffect(() => {
    getUserByUserId({
      variables: {
        userId: location?.state?.data?.userId,
      },
    });
  }, []);

  useEffect(() => {
    if (userData && userData?.getUserById) {
      setValues(userData?.getUserById[0]);
      setInitialValues(userData?.getUserById[0]);
    }
  }, [userData]);

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
  const OnEdit = () => {
    const variables = {
      input: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        password: values.password,
        userId: values.userId,
        role: +values?.role,
        portalRole: +values?.portalRole,
      },
    };

    updateUser({ variables });
    setDisable(true);
  };

  const { handleChange, handleSubmit, values, errors, setValues, setErrors } =
    useCreateUserValidation({
      callback: OnEdit,
    });

  const onEdit = () => {
    setDisable(false);
  };

  const onBack = () => {
    navigate(ROUTE_CONSTANT.VIEW_USER);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Card>
      <Grid
        container
        m={2}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Grid>
          <Typography variant="h3" className="create-user-title">
            {t('USER_ID')} {`: ${values?.userId}`}
          </Typography>
        </Grid>
        <Grid style={{ marginRight: '26px' }}>
          {disable ? (
            <HrmDeleteBtn
              label={t('Edit')}
              className="editbutton"
              onClick={onEdit}
            />
          ) : (
            <HrmDeleteBtn
              label={t('Cancel')}
              className="editbutton"
              onClick={() => {
                setValues(initialValues);
                setDisable(true);
                setErrors({});
              }}
            />
          )}
        </Grid>
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
              value={values?.firstName}
              error={errors?.firstName}
              style={{ marginBottom: '5px' }}
              helpertext={errors.firstName}
              onChange={handleChange}
              disabled={disable}
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
              disabled={disable}
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
              disabled={disable}
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
              disabled={disable}
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
              disabled={disable}
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
              disabled={disable}
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
              disabled={disable}
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
      {!disable && (
        <Grid m={2} align="right" className="submitbutton">
          <HrmYellowSubmitBtn label={t('Submit')} onClick={handleSubmit} />
        </Grid>
      )}
    </Card>
  );
};
export default EditUser;
