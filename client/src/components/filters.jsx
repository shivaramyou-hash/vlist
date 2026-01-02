/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import AutocompleteDropdown from './Inputs/AutocompleteDropdown';
// import { jobFilterLatest, jobFilterPriority } from "../core/constants";
// import useClient from "../../src/pages/prospect/useClient";
// import ResetIcon from "../../src/core/assets/images/resetIcon.png";
// import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import useAdmin from '@/pages/Admin/useAdmin';
import BackdropLoader from './Loader';

const DashboardVotersFilters = ({ setVotersList }) => {
  const [stateData, setStateData] = useState([]);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState([]);
  const [districtData, setDistrictData] = useState('');
  const [assembly, setAssembly] = useState('');
  // const [assemblyConst, setAssemblyConst] = useState('');
  const [assemblyOptions, setAssemblyOptions] = useState('');
  const [pollingData, setPollingData] = useState([]);
  const [polling, setPolling] = useState('');
  const {
    getAllStates,
    getAllStatesData,
    getDistrictsByState,
    getDistrictsByStateData,
    GetConstitutionsByDistricts,
    GetConstitutionsByDistrictsData,
    getAllPollingStation,
    PollingStationData,
    getVotersByPollingStation,
    getVotersByPollingStationData,
    loading,
  } = useAdmin();
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
    setDistrictData(districtoptions);
  }, [getDistrictsByStateData]);
  useEffect(() => {
    if (district) {
      // Fetch the districts based on the selected state
      GetConstitutionsByDistricts({
        variables: {
          stateCode: state['value'],
          districtCode: district['value'],
        },
      });
    }
  }, [district]);
  useEffect(() => {
    const assemblyoptions =
      GetConstitutionsByDistrictsData?.getConstitutionsByDistricts[0].constitutionName.map(
        (constitutionName) => ({
          label: constitutionName,
          value: constitutionName.split('-')[0],
        })
      );

    setAssemblyOptions(assemblyoptions);
  }, [GetConstitutionsByDistrictsData]);

  useEffect(() => {
    const pollingoptions = PollingStationData?.getPollingStations
      .map((polling) => ({
        label: `${polling.pollingStationName}-${polling.pollingStationCode}`,
        value: polling.pollingStationCode,
      }))
      .sort((a, b) => a.value - b.value);

    setPollingData(pollingoptions);
  }, [PollingStationData]);

  useEffect(() => {
    // Fetch all polling stations based on the selected state, district, and assembly constituency
    if (state && district && assembly) {
      // Extract the district code from the assemblyConst object's value property
      const assemblyDistrictCode = assembly.value.split('-')[0];

      getAllPollingStation({
        variables: {
          state: state.value,
          district: district['value'], // Make sure district is an integer
          assemblyConst: parseInt(assemblyDistrictCode), // Convert district code to integer
        },
      });
    }
  }, [state, district, assembly]);

  // useEffect(() => {
  //   // Fetch all polling stations based on the selected state, district, and assembly constituency
  //   if (state && district && assembly && polling) {
  //     // Extract the district code from the assemblyConst object's value property
  //     const assemblyDistrictCode = assembly.value.split('-')[0];

  //     getVotersByPollingStation({
  //       variables: {
  //         state: state.value,
  //         district: district['value'], // Make sure district is an integer
  //         assemblyConst: parseInt(assemblyDistrictCode), // Convert district code to integer
  //         pollingStationCode: polling.value,
  //       },
  //     });
  //   }
  // }, [state, district, assembly, polling]);

  const getVotersData = (val) => {
    const assemblyDistrictCode = assembly.value.split('-')[0];
    const variables = {
      input: {
        state: state.value,
        district: parseInt(district.value), // Make sure district is an integer
        assemblyConst: parseInt(assemblyDistrictCode), // Convert district code to integer
        pollingStationCode: val.value,
      },
    };

    getVotersByPollingStation({ variables });
  };

  useEffect(() => {
    setVotersList(getVotersByPollingStationData?.getVotersByPollingStation);
  }, [getVotersByPollingStationData]);

  return (
    <div>
      <BackdropLoader loading={loading} />
      <Grid item xs={12} sm={12} md={12} container pl={4}>
        {/* <h4>{'Voter Details'}:</h4> */}
      </Grid>
      <Grid container className="sortgrid">
        <Grid item xs={12} sm={12} md={12} container ml={2}>
          {/* <Grid xs={12} sm={12} md={1} ></Grid> */}

          <Grid xs={12} sm={12} md={3} p={1}>
            <Box className="subsort">
              <AutocompleteDropdown
                onChange={(e, val) => {
                  setState(val);
                }}
                options={stateData || []}
                name="state"
                value={state || ''}
                isOptionEqualToValue={(option, value) =>
                  option?.value === value?.label
                }
                // size="large"
                label="State"
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={3} p={1}>
            <Box className="subsort">
              <AutocompleteDropdown
                name="district"
                onChange={(e, val) => {
                  setDistrict(val);
                }}
                options={districtData || []}
                value={district}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value
                }
                // size="large"
                label="district"
              />
            </Box>
          </Grid>

          <Grid xs={12} sm={12} md={3} p={1}>
            <Box className="subsort">
              <AutocompleteDropdown
                name="assembly"
                onChange={(e, val) => {
                  setAssembly(val);
                }}
                options={assemblyOptions || []}
                // name="client"
                value={assembly || ''}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value
                }
                // size="large"
                label="assembly"
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={3} p={1}>
            <Box className="subsort">
              {/* <AutocompleteDropdown
                name="pollingstation"
                onChange={(e, val) => {
                  setPolling(val);
                }}
                value={pollingData || ''}
                options={pollingData || []}
                label="pollingstation"
                isOptionEqualToValue={(option, value) =>
                  option?.label === value
                }
              /> */}

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
                // size="large"
                label="pollingstation"
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

DashboardVotersFilters.propTypes = {
  setVotersList: PropTypes.any,
};

export default DashboardVotersFilters;
