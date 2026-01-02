import { Card, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ViewUser.css';
import PaginationTable from '../../../components/Table/pagination';
import {
  viewUserCols,
  userClickable,
} from '../../../components/Table/index.jsx';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import useUsers from './useUsers';
import { HrmYellowSubmitBtn } from '../../../components/Button/Buttons';
import toast from '../../../components/Toast';
import { Trash2 } from 'lucide-react';
import ConfirmAction from '@/components/Modal/ConfirmModal';

const ViewUser = () => {
  const { t } = useTranslation('translations');
  const { allUsersLoad, getAllUsers, allUsersData, deleteUser } = useUsers();
  const [searchText, setSearchText] = useState('');
  const [filteredusers, setfilteredusers] = useState([]);
  const [originalsUsers, setOriginalUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteSelectedUser, setDeleteSelectedUser] = useState('');

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (allUsersData && allUsersData?.getAllUsers) {
      const usersDetails = allUsersData.getAllUsers.map((user) => ({
        ...user,
        deleteButton: (
          // <HrmYellowSubmitBtn
          //   className="search-user-display"
          //   label={t('Search')}
          //   onClick={() => handleSearch(user)}
          // />
          <Trash2
            className="cursor-pointer text-red-600"
            size={20}
            onClick={() => handleDelete(user)}
          />
        ),
      }));

      setOriginalUsers(usersDetails);
      setfilteredusers(usersDetails);
    }
  }, [allUsersData]);

  const handleSearch = (e) => {
    if (searchText === '') {
      toast.error(`${t('ENTER_DATA')}`);
    } else {
      e.preventDefault();
      filterArray();
    }
  };

  const filterArray = () => {
    const filteredData =
      originalsUsers?.filter((i) => {
        return (
          String(i?.lastName)
            .toLowerCase()
            ?.includes(searchText.toLowerCase()) ||
          String(i?.email).toLowerCase()?.includes(searchText.toLowerCase()) ||
          String(i?.userId).toLowerCase()?.includes(searchText.toLowerCase()) ||
          String(i?.phone).toLowerCase()?.includes(searchText.toLowerCase()) ||
          String(i?.firstName).toLowerCase()?.includes(searchText.toLowerCase())
        );
      }) || [];

    if (filteredData.length > 0) {
      setfilteredusers(filteredData);
      setShow(true);
    } else if (searchText === '') {
      setfilteredusers(originalsUsers);
    } else {
      setfilteredusers(originalsUsers);
      toast.error(`${t('NO_MATCH')}`);
      setShow(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (searchText.trim() === '') {
        toast.error(`${t('ENTER_DATA')}`);
      } else {
        filterArray();
      }
    }
  };

  const onBack = () => {
    setShow(false);
    setSearchText('');
    setfilteredusers(originalsUsers); // Restore original clients
  };

  const handleDelete = (user) => {
    setDeleteShow(true);
    setDeleteSelectedUser(user);
  };

  const handleClose = () => setDeleteShow(false);

  const onDelete = () => {
    const variables = {
      userId: deleteSelectedUser.userId,
    };
    deleteUser({ variables }).then(() => {
      setDeleteShow(false);
    });
  };
  ``;
  return (
    <Card>
      <ConfirmAction
        show={deleteShow}
        handleClose={handleClose}
        onConfirm={onDelete}
      />
      <Grid sx={{ margin: 2 }}>
        <Typography variant="h4" className="title">
          {t('VIEW_USER')}
        </Typography>
      </Grid>
      <hr />
      <Grid container m={2}>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth>
            <OutlinedInput
              id="outlined-adornment-amount"
              size="small"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              placeholder={t('SEARCH_USER')}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12} md={1} ml={1}>
          <HrmYellowSubmitBtn
            className="search-user-display"
            label={t('Search')}
            onClick={handleSearch}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center' }} p={2}>
        <PaginationTable
          colsData={viewUserCols}
          rowsData={filteredusers}
          clickable={userClickable}
        />
      </Grid>

      {show && (
        <Grid className="view-user-display" m={2}>
          <HrmYellowSubmitBtn label={t('Back')} onClick={onBack} />
        </Grid>
      )}
    </Card>
  );
};

export default ViewUser;
