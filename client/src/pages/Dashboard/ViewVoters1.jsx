// import { HrmYellowBtn } from '@/components/Button/Buttons';
// import SearchIcon from '@mui/icons-material/Search';
import { Card, Grid, Box } from '@mui/material/';
// import FormControl from '@mui/material/FormControl';
// import InputAdornment from '@mui/material/InputAdornment';
// import OutlinedInput from '@mui/material/OutlinedInput';
import { useEffect, useState } from 'react';
// import { viewcotercols } from '../../components/Table/index.jsx';
// import PaginationTable from '../../components/Table/pagination';
import { useSelector } from 'react-redux';
import './viewVoters.css';
import AutocompleteDropdown from '@/components/Inputs/AutocompleteDropdown.jsx';
import BackdropLoader from '@/components/Loader/index.jsx';
import useAdmin from '../Admin/useAdmin.js';
import useVoters from '../Dashboard/useVoters.js';
import ViewVotersTable from './ViewVotersTable.jsx';

const ViewVoter = () => {
  const [votersList, setVotersList] = useState([]);

  // const [searchText, setSearchText] = useState('');
  const [assemblyOptions, setAssemblyOptions] = useState([]);
  const [pollingData, setPollingData] = useState([]);
  const [polling, setPolling] = useState('');
  const [stateData, setStateData] = useState([]);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [assembly, setAssembly] = useState('');

  const user = useSelector((state) => state.user.userData);

  const {
    getAllStates,
    getAllStatesData,
    getDistrictsByState,
    getDistrictsByStateData,
    GetAssignedConstitutionsByDistrict,
    GetAssignedConstitutionsByDistrictData,
    getAssignedPollingStationsData,
    getAssignedPollingStations,
    getVotersByPollingStation,
    getVotersByPollingStationData,
    getVotersAccessByPollingStation,
    getVotersAccessByPollingStationData,
    loading,
  } = useAdmin();

  const { updateSingleVoter, loading: voterLoading } = useVoters({
    state: state?.value,
    district: parseInt(district?.value),
    assemblyConst: parseInt(assembly?.value?.split('-')[0]),
    psNo: polling?.value,
  });

  useEffect(() => {
    getAllStates();
  }, []);

  useEffect(() => {
    const stateOptions = getAllStatesData?.getAllStates.map((state) => ({
      label: state.stateName,
      value: state.stateCode,
    }));
    setStateData(stateOptions);
  }, [getAllStatesData]);

  useEffect(() => {
    if (state) {
      // Fetch the districts based on the selected state
      getDistrictsByState({
        variables: {
          stateCode: state['value'],
        },
      });
    }
  }, [state]);

  useEffect(() => {
    const districtoptions = getDistrictsByStateData?.getDistrictsByState.map(
      (district) => ({
        label: district.districtName,
        value: district.districtCode,
      })
    );

    // Sort the districtoptions array by district name
    districtoptions?.sort((a, b) => a.value - b.value);

    setDistrictData(districtoptions);
  }, [getDistrictsByStateData]);

  useEffect(() => {
    if (district?.['value']) {
      GetAssignedConstitutionsByDistrict({
        variables: {
          stateCode: state['value'],
          districtCode: district?.['value'],
          userId: user?.[0]?.userId,
        },
      });
    }
  }, [district]);

  useEffect(() => {
    const assemblyoptions =
      GetAssignedConstitutionsByDistrictData?.getAssignedConstitutionsByDistricts.map(
        (constitution) => ({
          label: constitution?.assemblyConstName,
          value: constitution?.assemblyConstName.split('-')[0],
        })
      );

    setAssemblyOptions(assemblyoptions);
  }, [GetAssignedConstitutionsByDistrictData]);

  useEffect(() => {
    const pollingoptions =
      getAssignedPollingStationsData?.getAssignedPollingStations
        ?.map((polling) => ({
          label: `${polling.pollingStationName}-${polling.pollingStationCode}`,
          value: polling.pollingStationCode,
        }))
        .sort((a, b) => a.value - b.value);

    setPollingData(pollingoptions);
  }, [getAssignedPollingStationsData]);

  useEffect(() => {
    // Fetch all polling stations based on the selected state, district, and assembly constituency
    if (state && district && assembly) {
      // Extract the district code from the assemblyConst object's value property
      const assemblyDistrictCode = assembly.value.split('-')[0];
      const variables = {
        input: {
          state: state.value,
          district: district['value'], // Make sure district is an integer
          assemblyConst: parseInt(assemblyDistrictCode), // Convert district code to integer
          userId: user?.[0]?.userId,
        },
      };

      getAssignedPollingStations({ variables });
    }
  }, [state, district, assembly]);

  const getVotersData = (val) => {
    const assemblyDistrictCode = assembly.value.split('-')[0];
    const variables = {
      input: {
        state: state.value,
        district: parseInt(district.value), // Make sure district is an integer
        assemblyConst: parseInt(assemblyDistrictCode), // Convert district code to integer
        pollingStationCode: val.value,
        userId: user?.[0]?.userId,
      },
    };

    const key = `${state.value}-${parseInt(district.value)}-${parseInt(
      assemblyDistrictCode
    )}-${val.value}`;
    const data = localStorage.getItem(key);
    if (data?.length === 0 || data === null) {
      getVotersAccessByPollingStation({ variables });
      setVotersList([]);
    } else {
      setVotersList(JSON.parse(data));
    }
  };

  useEffect(() => {
    const votersData =
      getVotersAccessByPollingStationData?.getVotersAccessByPollingStation;
    if (votersData) {
      const assemblyDistrictCode = assembly?.value?.split('-')[0];
      const key = `${state.value}-${parseInt(district.value)}-${parseInt(
        assemblyDistrictCode
      )}-${polling.value}`;
      const votersStringifyData = JSON.stringify(votersData);

      localStorage.setItem(key, votersStringifyData);

      setVotersList(votersData);
    }
  }, [getVotersAccessByPollingStationData]);

  const handleUpdateVoter = (data) => {
    const assemblyDistrictCode = assembly.value.split('-')[0];
    const variables = {
      input: {
        state: state.value,
        district: parseInt(district.value),
        assemblyConst: parseInt(assemblyDistrictCode),
        psNo: polling.value,
        data: JSON.stringify(data),
      },
    };
    updateSingleVoter({ variables });
  };

  return (
    <>
      {/* <Card> */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
          <h3>{'View Voter List'}</h3>
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
          <div>
            <BackdropLoader loading={loading || voterLoading} />
            <Grid item xs={12} sm={12} md={12} container pl={4}></Grid>
            <Grid container className="sortgrid">
              <Grid item xs={12} sm={12} md={12} container ml={2}>
                <Grid item xs={12} sm={12} md={3} p={1}>
                  <Box className="subsort">
                    <AutocompleteDropdown
                      onChange={(e, val) => {
                        setState(val);
                        setVotersList([]);
                      }}
                      options={stateData || []}
                      name="state"
                      value={state || ''}
                      isOptionEqualToValue={(option, value) =>
                        option?.value === value?.label
                      }
                      getOptionLabel={(option) => option?.label || ''}
                      // size="large"
                      label="State"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} p={1}>
                  <Box className="subsort">
                    <AutocompleteDropdown
                      name="district"
                      onChange={(e, val) => {
                        setDistrict(val);
                        setVotersList([]);
                      }}
                      options={districtData || []}
                      value={district}
                      isOptionEqualToValue={(option, value) =>
                        option?.label === value
                      }
                      getOptionLabel={(option) => option?.label || ''}
                      // size="large"
                      label="District"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={3} p={1}>
                  <Box className="subsort">
                    <AutocompleteDropdown
                      name="assembly"
                      onChange={(e, val) => {
                        setAssembly(val);
                        setVotersList([]);
                        setPolling('');
                      }}
                      options={assemblyOptions || []}
                      // name="client"
                      value={assembly || ''}
                      isOptionEqualToValue={(option, value) =>
                        option?.label === value
                      }
                      getOptionLabel={(option) => option?.label || ''}
                      // size="large"
                      label="Assembly Constituency "
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} p={1}>
                  <Box className="subsort">
                    <AutocompleteDropdown
                      name="pollingstation"
                      onChange={(e, val) => {
                        setPolling(val);
                        getVotersData(val);
                      }}
                      options={pollingData || []}
                      // name="client"
                      value={polling || ''}
                      isOptionEqualToValue={(option, value) =>
                        option?.label === value
                      }
                      getOptionLabel={(option) => option?.label || ''}
                      // size="large"
                      label="Polling Station"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
        {/* <Grid className="d-flex view-client-consticy" m={2}>
            <Grid className="view-consticy-searchdisplay">
              <FormControl fullWidth>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  size="small"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  // onKeyPress={handleKeyPress}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  placeholder={t('SEARCH_BY_CONSTITUENCY')}
                />
              </FormControl>
            </Grid>
            <HrmYellowBtn
              className="search-client-consticy"
              label={t('Search')}
              // onClick={handleSearchData}
            />
          </Grid> */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          style={{ textAlign: 'center' }}
          p={2}
        >
          <ViewVotersTable
            votersList={votersList}
            handleUpdateVoter={handleUpdateVoter}
          />
        </Grid>
      </Grid>
      {/* </Card> */}
    </>
  );
};

export default ViewVoter;
