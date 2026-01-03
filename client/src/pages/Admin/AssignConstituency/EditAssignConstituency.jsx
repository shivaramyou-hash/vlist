/* eslint-disable react-hooks/exhaustive-deps */
import { HrmYellowSubmitBtn } from '@/components/Button/Buttons';
import AutocompleteDropdown from '@/components/Inputs/AutocompleteDropdown';
import { Grid, Typography, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AutoCompleteMultiple from '../../../components/Inputs/AutoCompleteMultipleDropdown';
import useAdmin from '../useAdmin';
import './AssignConstituency.css';
import { useParams } from 'react-router';
import toast from '../../../components/Toast';
import useAssignConstituency from './useAssignConstituency';
import BackdropLoader from '@/components/Loader';
import MultipleAssignedConstituency from './MultipleAssignedConstituency';
import { useSelector } from 'react-redux';

const EditAssignConstituency = () => {
  const { t } = useTranslation('translations');
  const [state, setState] = useState('');
  const [stateData, setStateData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [district, setDistrict] = useState('');
  const [assembly, setAssembly] = useState('');
  const [assemblyData, setAssemblyData] = useState([]);
  const [pollingData, setPollingData] = useState([]);
  const [polling, setPolling] = useState('');
  const { userId } = useParams();
  // const [isEditing, setIsEditing] = useState(false);
  const [assemblyallData, setAssemblyAllData] = useState([]);
  const [writeAccess, setWriteAccess] = useState([]);
  // const [editedRowIndex, setEditedRowIndex] = useState(null);
  const [stateValue, setStateValue] = useState([
    {
      // state: '',  district: ''
    },
  ]);
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
    GetAssignedConstitutionsByDistrict,
    GetAssignedConstitutionsByDistrictData,
    getAssignedPollingStationsData,
    getAssignedPollingStations,
    // loading,
  } = useAdmin();

  const {
    createAssignedConst,
    loading,
    getAllAssignConstitutionsByUser,
    getAllAssignConstData,
    getAllUsers,
  } = useAssignConstituency({ userId: userId });
  useEffect(() => {
    getAllStates();
    getAllUsers();
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
    // Conditionally fetch assigned constitutions based on the selected district
    if (district) {
      if (user && user[0].portalRole === 1) {
        // If the user is a superadmin (portalRole = 1), fetch all constitutions for the district
        GetConstitutionsByDistricts({
          variables: {
            stateCode: state.value,
            districtCode: district.value,
          },
        });
      } else if (user && user[0].portalRole === 2) {
        // If the user is an admin (portalRole = 2), fetch assigned constitutions for the district
        GetAssignedConstitutionsByDistrict({
          variables: {
            stateCode: state.value,
            districtCode: district.value,
            userId: user[0].userId,
          },
        });
      }
    }
  }, [
    district,
    user,
    GetConstitutionsByDistricts,
    GetAssignedConstitutionsByDistrict,
  ]);

  useEffect(() => {
    const assemblyOptions = [];
    if (user && user[0].portalRole === 1 && GetConstitutionsByDistrictsData) {
      assemblyOptions.push(
        ...GetConstitutionsByDistrictsData.getConstitutionsByDistricts[0].constitutionName.map(
          (constitutionName) => ({
            label: constitutionName,
            value: constitutionName,
          })
        )
      );
    } else if (
      user &&
      user[0].portalRole === 2 &&
      GetAssignedConstitutionsByDistrictData
    ) {
      const assignedConstitutions =
        GetAssignedConstitutionsByDistrictData.getAssignedConstitutionsByDistricts.map(
          (constitution) => ({
            label: constitution?.assemblyConstName,
            value: constitution?.assemblyConstName.split('-')[0],
          })
        );
      assemblyOptions.push(...assignedConstitutions);
    }
    setAssemblyData(assemblyOptions);
  }, [
    user,
    GetConstitutionsByDistrictsData,
    GetAssignedConstitutionsByDistrictData,
  ]);

  useEffect(() => {
    // Fetch all polling stations based on the selected state, district, and assembly constituency
    if (state && district && assembly) {
      // Extract the district code from the assemblyConst object's value property
      const assemblyDistrictCode = assembly.value.split('-')[0];

      if (user && user[0].portalRole === 1) {
        getAllPollingStation({
          variables: {
            state: state.value,
            district: district['value'], // Make sure district is an integer
            assemblyConst: parseInt(assemblyDistrictCode), // Convert district code to integer
          },
        });
      } else if (user && user[0].portalRole === 2) {
        const variables = {
          input: {
            state: state.value,
            district: district['value'], // Make sure district is an integer
            assemblyConst: parseInt(assemblyDistrictCode), // Convert district code to integer
            userId: user[0].userId,
          },
        };
        getAssignedPollingStations({ variables });
      }
    }
  }, [state, district, assembly, user]);

  useEffect(() => {
    let pollingOptions = [];

    // Check if the user's portal role is 1 (superadmin)
    if (user && user[0].portalRole === 1) {
      if (PollingStationData?.getPollingStations?.length > 0) {
        pollingOptions = [
          { label: 'ALL', value: 0 },
          ...PollingStationData.getPollingStations.map((polling) => ({
            label: `${polling.pollingStationName}-${polling.pollingStationCode}`,
            value: polling.pollingStationCode,
          })),
        ].sort((a, b) => a.value - b.value);
      }
    } else if (user && user[0].portalRole === 2) {
      // If the user's portal role is 2 (admin)
      const assignedPollingStations =
        getAssignedPollingStationsData?.getAssignedPollingStations;
      if (assignedPollingStations?.length > 0) {
        pollingOptions = assignedPollingStations
          .map((polling) => ({
            label: `${polling.pollingStationName}-${polling.pollingStationCode}`,
            value: polling.pollingStationCode,
          }))
          .sort((a, b) => a.value - b.value);
      }
    }

    // Update the polling data state
    setPollingData(pollingOptions);
  }, [PollingStationData, getAssignedPollingStationsData, user]);

  useEffect(() => {
    getAllAssignConstitutionsByUser({
      variables: {
        userId: userId,
      },
    });
  }, [getAllAssignConstData]);

  useEffect(() => {
    if (getAllAssignConstData?.getAssignedConstitutionsByUser) {
      const data = [...getAllAssignConstData.getAssignedConstitutionsByUser];

      setStateValue(data);
      setAssemblyAllData([
        ...getAllAssignConstData.getAssignedConstitutionsByUser,
      ]);
    }
  }, [getAllAssignConstData?.getAssignedConstitutionsByUser]);

  const handleSubmit = () => {
    const pollVal =
      polling?.value === 0 ? [0] : polling.map((item) => item.value);
    const writeAccessVal = writeAccess?.map((item) => item.value);

    const variables = {
      input: {
        state: state?.value,
        district: district?.value,
        assemblyConst: +assembly?.value?.split('-')[0],
        userId: userId,
        pollingStations: pollVal,
        writeAccess: writeAccessVal,
      },
    };
    createAssignedConst({ variables }).then(() => {
      setState('');
      setDistrict('');
      setAssembly('');
      setPolling('');
      setWriteAccess('');
    });
  };

  return (
    <Grid>
      <Card style={{ padding: '16px' }}>
        <BackdropLoader loading={loading} />
        {/* <h3>UserId: {userId}</h3> */}
        <Typography
          variant="h3"
          style={{ paddingLeft: '1%', paddingBottom: '2%', fontSize: '18px' }}
        >
          UserId: {userId}
        </Typography>

        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            container
            alignItems={'center'}
            my={1}
          >
            <Grid item xs={12} sm={6} md={4} className="firstgrid">
              <Typography px={2}>
                {t('STATE')} <span className="title-imp">*</span>:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={7} className="textgrid">
              <AutocompleteDropdown
                name="state"
                onChange={(e, val) => {
                  setState(val);
                }}
                options={stateData || []}
                value={state || ''}
                isOptionEqualToValue={(option, value) =>
                  option?.value === value?.label
                }
                label="State"
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            container
            alignItems={'center'}
            my={1}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Typography px={2}>
                {t('DISTRICT')} <span className="title-imp">*</span>:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={7} className="textgrid">
              <AutocompleteDropdown
                name="districtName"
                onChange={(e, val) => {
                  setDistrict(val);
                }}
                options={districtData || []}
                value={district || ''}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value
                }
                label="District Name"
                // size="large"
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            container
            alignItems={'center'}
            my={1}
          >
            <Grid item xs={12} sm={6} md={4} className="firstgrid">
              <Typography px={2}>
                {t('ASSEMBLY')} <span className="title-imp">*</span>:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={7} className="textgrid">
              <AutocompleteDropdown
                name="assembly"
                onChange={(e, val) => {
                  setAssembly(val);
                }}
                options={assemblyData || []}
                value={assembly || ''}
                isOptionEqualToValue={(option, value) =>
                  option?.value === value?.label
                }
                label="assembly"
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            container
            alignItems={'center'}
            my={1}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Typography px={2}>
                {t('POLLING')} <span className="title-imp">*</span>:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={7} className="textgrid">
              <AutoCompleteMultiple
                name="pollingStation"
                // onChange={(e, val) => {
                //   setPolling(val);
                // }}
                onChange={(e, val) => {
                  const selectedAll = val.find((option) => option.value === 0);
                  const selectedOthers = val.filter(
                    (option) => option.value !== 0
                  );

                  if (selectedAll && selectedOthers.length > 0) {
                    // If both "ALL" and other options are selected, show toast
                    toast.warning(
                      "Cannot select 'ALL' and other options at the same time"
                    );
                  } else {
                    // Set the selected options as-is
                    setPolling(val);
                  }
                }}
                options={pollingData || []}
                value={polling || []}
                label="pollingStations"
                // size="large"
              />
            </Grid>
          </Grid>
          <Grid xs={12} sm={6} md={6} container alignItems={'center'} my={1}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography px={2}>
                {t('WRITE_ACCESS')} <span className="title-imp">*</span>:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={7} className="textgrid">
              <AutoCompleteMultiple
                name="writeAccess"
                onChange={(e, val) => {
                  setWriteAccess(val);
                }}
                options={polling[0]?.value === 0 ? pollingData : polling || []}
                label="Write Access"
                value={writeAccess || []}
              />
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            className="assign-submit"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: '4%',
            }}
          >
            <HrmYellowSubmitBtn label={t('Submit')} onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Card>

      <Grid>
        {assemblyallData?.map((data, index) => (
          <MultipleAssignedConstituency key={index} data={data} />
        ))}
      </Grid>
    </Grid>
  );
};
export default EditAssignConstituency;
