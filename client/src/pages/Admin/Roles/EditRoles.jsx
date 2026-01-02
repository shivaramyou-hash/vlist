import React, { useEffect, useState } from 'react';
import { Card, Grid, Typography } from '@mui/material/';
import TextFieldComponent from '@/components/Inputs/TextFieldComponent';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import useRoles from './useRoles';
import './EditRole.css';
import {
  HrmBackBtn,
  HrmBlackBtn,
  HrmDeleteBtn,
  HrmYellowSubmitBtn,
} from '@/components/Button/Buttons';
import BackdropLoader from '@/components/Loader/index.jsx';
import ROUTE_CONSTANT from '@/Routers/routeConstants';
import ConfirmAction from '@/components/Modal/ConfirmModal';
const EditRoles = () => {
  const { t } = useTranslation('translations');
  const location = useLocation();
  const { roleByIdData, getRoleById, loading, updateRole, deleteRole } =
    useRoles();
  const [role, setRole] = useState('');
  const roleId = location?.state?.data?.roleId;
  const [isEdit, setIsEdit] = useState(true);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    getRoleById({
      variables: {
        roleId: roleId,
      },
    });
  }, [roleId]);

  useEffect(() => {
    if (roleByIdData?.getRoleById) {
      const roleName = roleByIdData?.getRoleById?.role;

      setRole(roleName);
    }
  }, [roleByIdData?.getRoleById]);

  const handleRoleChange = (e) => {
    setRole(e?.target?.value);
  };

  const onEdit = () => {
    setIsEdit(!isEdit);
  };

  const onSubmit = () => {
    const variables = {
      input: {
        role: role,
        roleId: roleId,
      },
    };

    updateRole({ variables });
    setIsEdit(!isEdit);
  };

  const onBack = () => {
    navigate(ROUTE_CONSTANT.ROLES);
  };

  const onDelete = () => {
    const variables = {
      roleId: +roleId,
    };
    deleteRole({ variables }).then(() => {
      navigate(ROUTE_CONSTANT.ROLES);
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card>
      <BackdropLoader loading={loading} />
      <Grid item xs={12} sm={12} md={12} m={1}>
        <Typography variant="h6" className="screen-title" px={2}>
          {t('EDIT_ROLES')}
        </Typography>
      </Grid>
      <hr />
      <Grid item xs={12} sm={12} md={12} m={1} align="right">
        {!isEdit ? (
          <div>
            <HrmBlackBtn
              className={'cancel-btn'}
              label={'Cancel'}
              onClick={onEdit}
            />
          </div>
        ) : (
          <div>
            <HrmBlackBtn
              label={'Edit'}
              className={'cancel-btn'}
              onClick={onEdit}
            />
            <HrmDeleteBtn
              label={'Delete'}
              onClick={() => {
                handleShow();
              }}
            />
            <ConfirmAction
              show={show}
              handleClose={handleClose}
              onConfirm={onDelete}
            />
          </div>
        )}
      </Grid>
      <Grid container m={2}>
        <Grid item xs={12} sm={6} md={6} container alignItems={'center'} my={1}>
          <Grid item xs={12} sm={5} md={5}>
            <Typography>
              {t('Role')} <span className="title-imp">*</span>:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextFieldComponent
              type="text"
              name="Role"
              placeholder={t('Role')}
              style={{ marginBottom: '5px' }}
              value={role}
              onChange={(e) => handleRoleChange(e)}
              disabled={isEdit}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <HrmBackBtn label="Back" onClick={onBack} />
          </Grid>
          {!isEdit && (
            <Grid item xs={6} align="right" pr={4}>
              <HrmYellowSubmitBtn label="Submit" onClick={onSubmit} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default EditRoles;
