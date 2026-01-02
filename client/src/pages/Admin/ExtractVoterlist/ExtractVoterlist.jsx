import AutocompleteDropdown from '@/components/Inputs/AutocompleteDropdown';
import BackdropLoader from '@/components/Loader';
import { Box, Card, CircularProgress, Grid } from '@mui/material/';
import { useEffect, useState } from 'react';
import {
  HrmYellowBtn,
  HrmYellowSubmitBtn,
} from '../../../components/Button/Buttons';
import UploadComponent from '../../../components/Inputs/uploadComponent';
import toast from '../../../components/Toast';
import useAdmin from '../useAdmin';
import PaginationTable from '@/components/Table/pagination';
import { extractedInputVoterListCols } from '@/components/Table';
import { useSelector } from 'react-redux';
import axios from 'axios';
import useExtractedVoter from './useExtractedVoter';
import moment from 'moment';

const ExtractVoterlist = () => {
  const [states, setStates] = useState('');
  const [district, setDistrict] = useState('');
  const [assemblyConst, setAssemblyConst] = useState('');
  const [assemblyOptions, setAssemblyOptions] = useState('');
  const [pollingData, setPollingData] = useState([]);
  const [polling, setPolling] = useState('');

  const [stateOptions, setStateOptions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [file, setFile] = useState();
  const [extractLoading, setExtractLoading] = useState(false);

  const [extractedData, setExtractedData] = useState([]);

  const user = useSelector((state) => state.user.userData);

  const {
    getAllStates,
    getAllStatesData,
    getDistrictsByState,
    getDistrictsByStateData,
    GetConstitutionsByDistricts,
    GetConstitutionsByDistrictsData,
    getAllPollingStation,
    PollingStationData,
    loading,
  } = useAdmin();

  const {
    getExtractedVoterListByUserId,
    extractedVoterData,
    loading: extractedLoading,
  } = useExtractedVoter();

  useEffect(() => {
    getAllStates();
  }, []);
  useEffect(() => {
    if (states) {
      // Fetch the districts based on the selected state
      getDistrictsByState({
        variables: {
          stateCode: states['value'],
        },
      });
    }
  }, [states]);

  useEffect(() => {
    if (district) {
      // Fetch the districts based on the selected state
      GetConstitutionsByDistricts({
        variables: {
          stateCode: states['value'],
          districtCode: district['value'],
        },
      });
    }
  }, [district]);

  useEffect(() => {
    const stateOptions = getAllStatesData?.getAllStates.map((state) => ({
      label: state.stateName,
      value: state.stateCode,
    }));

    setStateOptions(stateOptions);
  }, [getAllStatesData]);

  useEffect(() => {
    const districtoptions = getDistrictsByStateData?.getDistrictsByState.map(
      (district) => ({
        label: district.districtName,
        value: district.districtCode,
      })
    );
    setDistricts(districtoptions);
  }, [getDistrictsByStateData]);

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
    // Fetch all polling stations based on the selected state, district, and assemblyConst constituency
    if (states && district && assemblyConst) {
      // Extract the district code from the assemblyConst object's value property
      const assemblyDistrictCode = assemblyConst.value.split('-')[0];
      getAllPollingStation({
        variables: {
          state: states.value,
          district: district.value,
          assemblyConst: parseInt(assemblyDistrictCode), // Convert district code to integer
        },
      });
    }
  }, [states, district, assemblyConst]);

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
    getExtractedVoterList();
  }, []);

  const getExtractedVoterList = () => {
    const variables = { userId: user?.[0]?.userId };
    getExtractedVoterListByUserId({ variables });
  };

  useEffect(() => {
    if (extractedVoterData?.getExtractedVoterListByUserId) {
      const data = extractedVoterData.getExtractedVoterListByUserId.map(
        (user) => ({
          ...user,
          status:
            user.status === 'inprogress' ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size="30px" />
              </Box>
            ) : (
              'Completed'
            ),
          downloadBtn: (
            <HrmYellowSubmitBtn
              className="search-user-display"
              label="Download"
              width="400%"
              onClick={() => {
                if (user.url) {
                  window.open(user.url, '_blank');
                } else {
                  console.warn('No URL found for user');
                }
              }}
            />
          ),
          createdOn: moment(+user.createdOn)
            .add(5, 'hours')
            .add(30, 'minutes')
            .format('DD-MM-YYYY HH:mm:ss'),
        })
      );

      setExtractedData(data);

      const anyInProgress =
        extractedVoterData.getExtractedVoterListByUserId.some(
          (user) => user.status === 'inprogress'
        );

      if (anyInProgress) {
        const interval = setInterval(() => {
          const variables = { userId: user?.[0]?.userId };
          getExtractedVoterListByUserId({ variables });
        }, 10000); // 10 seconds

        return () => clearInterval(interval);
      }
    }
  }, [extractedVoterData]);

  const handleSubmit = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    setExtractLoading(true);

    formData.append('file', file);
    formData.append('userId', user?.[0]?.userId);
    formData.append('state', states.value);
    formData.append('district', district.value);
    formData.append('assemblyConst', assemblyConst.value);
    formData.append('pollingStation', polling.value);

    try {
      const resumeParserResponse = await axios.post(
        'https://voter-extract-api-542923663826.asia-south1.run.app/extract',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (resumeParserResponse.data.status === 'Processing started') {
        setStates('');
        setDistrict('');
        setAssemblyConst('');
        setPolling('');
        setFile(null); // Clear the file input after successful extraction

        getExtractedVoterList();
        toast.success('Upload successful! Processing in background.');
      } else if (resumeParserResponse.data.status === 'Already uploaded') {
        toast.info('This PDF has already been uploaded.');
      }

      // ✅ Stop loading after success
      setExtractLoading(false);

      // Optional: You can add a success toast here
    } catch (error) {
      setExtractLoading(false); // ✅ Also stop loading on error
      console.error('Error during resume parser request:', error);

      // Optional: Show an error toast
      // toast.error("Failed to upload file");
    }
  };

  return (
    <>
      <BackdropLoader loading={loading || extractLoading || extractedLoading} />
      <Card>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
            <h3>{'Extract Voter List'}</h3>
          </Grid>

          <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
            <h4>{'Upload Document Here'}</h4>
          </Grid>
          <Grid container className="sortgrid">
            <Grid item xs={12} sm={12} md={12} container ml={2}>
              <Grid item xs={12} sm={12} md={3} p={1}>
                <Box className="subsort">
                  <AutocompleteDropdown
                    name="states"
                    onChange={(e, val) => {
                      setStates(val);
                    }}
                    options={stateOptions || []}
                    value={states || ''}
                    isOptionEqualToValue={(option, value) =>
                      option?.value === value?.label
                    }
                    label="States"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={3} p={1}>
                <Box className="subsort">
                  <AutocompleteDropdown
                    name="districtName"
                    onChange={(e, val) => {
                      setDistrict(val);
                    }}
                    options={districts || []}
                    value={district || ''}
                    isOptionEqualToValue={(option, value) =>
                      option?.label === value
                    }
                    label="District Name"
                    // size="large"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={3} p={1}>
                <Box className="subsort">
                  <AutocompleteDropdown
                    name="Assembly Constituency"
                    onChange={(e, val) => {
                      setAssemblyConst(val);
                    }}
                    options={assemblyOptions || []}
                    value={assemblyConst || ''}
                    isOptionEqualToValue={(option, value) =>
                      option?.label === value
                    }
                    // size="large"
                    label="Assembly Constituency"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={3} p={1}>
                <Box className="subsort">
                  <AutocompleteDropdown
                    name="pollingstation"
                    onChange={(e, val) => {
                      setPolling(val);
                    }}
                    options={pollingData || []}
                    value={polling || ''}
                    isOptionEqualToValue={(option, value) =>
                      option?.label === value
                    }
                    // size="large"
                    label="Polling Station"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{ textAlign: 'center' }}
            container
            p={2}
          >
            <Grid item xs={12} sm={12} md={7} style={{ textAlign: 'right' }}>
              <UploadComponent
                value={file}
                name="voterList"
                onChange={(e) => {
                  e.preventDefault();
                  setFile(e.target.files[0]); // Get the actual File object
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} style={{ textAlign: 'left' }}>
              <HrmYellowBtn
                onClick={() => handleSubmit()}
                label={'Submit'}
                // disabled={!parsedData}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '16px',
              marginBottom: '16px',
            }}
          >
            <PaginationTable
              colsData={extractedInputVoterListCols}
              rowsData={extractedData}
              // clickable={assignClickable}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default ExtractVoterlist;
