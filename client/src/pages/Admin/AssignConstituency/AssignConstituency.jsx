import { useEffect, useState } from 'react';
import PaginationTable from '../../../components/Table/pagination';
import { Card, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import toast from '../../../components/Toast';
import { assignClickable } from '../../../components/Table/index.jsx';
import './AssignConstituency.css';
import { assignUserCols } from '../../../components/Table';
import useAssignConstituency from './useAssignConstituency';
import { HrmBackBtn, HrmYellowSubmitBtn } from '@/components/Button/Buttons';

const AssignConstituency = () => {
  const { t } = useTranslation('translations');
  const { getAllUsers, allUsersData } = useAssignConstituency({ userId: '' });
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (allUsersData && allUsersData.getAllUsers) {
      const usersDetails = allUsersData.getAllUsers.map((user) => {
        return {
          ...user,
        };
      });

      setOriginalUsers(usersDetails);
      setFilteredUsers(usersDetails);
    }
  }, [allUsersData]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() === '') {
      toast.error(`${t('ENTER_DATA')}`);
    } else {
      filterArray();
    }
  };

  const filterArray = () => {
    const filteredData = originalUsers.filter(
      (i) =>
        String(i?.lastName).toLowerCase().includes(searchText.toLowerCase()) ||
        String(i?.userId).toLowerCase().includes(searchText.toLowerCase()) ||
        String(i?.firstName).toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredData.length > 0) {
      setFilteredUsers(filteredData);
      setShow(true);
    } else {
      setFilteredUsers(originalUsers);
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
    setFilteredUsers(originalUsers);
  };

  return (
    <Card>
      <Grid sx={{ margin: 2 }}>
        <Typography variant="h4" className="title">
          {t('ASSIGN_CONSTITUENCY')}
        </Typography>
      </Grid>
      <hr />

      <Grid container m={2}>
        <Grid item xs={12} sm={12} md={10}>
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
      <Grid m={2}>
        <PaginationTable
          colsData={assignUserCols}
          rowsData={filteredUsers}
          clickable={assignClickable}
        />
      </Grid>
      {show && (
        <Grid className="view-user-display" m={2}>
          <HrmBackBtn label={t('Back')} onClick={onBack} />
        </Grid>
      )}
    </Card>
  );
};

export default AssignConstituency;
