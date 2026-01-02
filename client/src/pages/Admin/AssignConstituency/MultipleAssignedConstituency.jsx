import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import {
  HrmBlackBtn,
  HrmDeleteBtn,
  HrmYellowSubmitBtn,
} from '@/components/Button/Buttons';
import AutoCompleteMultiple from '../../../components/Inputs/AutoCompleteMultipleDropdown';
import AutocompleteDropdown from '@/components/Inputs/AutocompleteDropdown';
import { useTranslation } from 'react-i18next';
import useAdmin from '../useAdmin';
import useAssignConstituency from './useAssignConstituency';
import { useParams } from 'react-router';
import BackdropLoader from '@/components/Loader';
import ConfirmAction from '@/components/Modal/ConfirmModal';

const MultipleAssignedConstituency = ({ data }) => {
  const [state, setState] = useState('');
  const [districtData, setDistrictData] = useState([]);
  const [assemblyData, setAssemblyData] = useState([]);
  const { userId } = useParams();
  const { t } = useTranslation('translations');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState();
  const [stateData, setStateData] = useState([]);
  const [pollingData, setPollingData] = useState([]);
  const [show, setShow] = useState(false);

  const {
    getAllStates,
    getAllStatesData,
    getDistrictsByState,
    getDistrictsByStateData,
    GetConstitutionsByDistricts,
    GetConstitutionsByDistrictsData,
    getAllPollingStation,
    PollingStationData,
  } = useAdmin();

  const { createAssignedConst, loading, deleteAssignedConstituency } =
    useAssignConstituency({
      userId: userId,
    });

  useEffect(() => {
    const pollingStationData = data?.pollingStations?.flatMap((ids) => {
      const filteredPollingData = pollingData?.filter((pollingItem) => {
        return ids === pollingItem.value;
      });

      return filteredPollingData; // Return filtered data directly
    });
    const updatedData = {
      ...data,
      pollingStationData: pollingStationData,

      writeAccess: data?.writeAccess?.flatMap((ids) => {
        const filteredwriteAccess = pollingStationData?.filter(
          (pollingItem) => {
            return ids === pollingItem.value;
          }
        );

        return filteredwriteAccess; // Return filtered data directly
      }),
      stateNames: stateData?.find((i) => i.value === data?.state),
      districtNames: districtData?.find((i) => i.value === data?.district),
      assemblyConstNames: assemblyData?.find(
        (i) => i.value === data?.assemblyConstName
      ),
    };

    setUpdatedData(updatedData);
  }, [data, pollingData]);

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
    // Fetch the districts based on the selected state
    if (updatedData) {
      getDistrictsByState({
        variables: {
          stateCode: updatedData?.stateName?.['value'] || updatedData?.state,
        },
      });
    }
  }, [updatedData]);

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
    // Fetch the districts based on the selected state
    if (updatedData) {
      GetConstitutionsByDistricts({
        variables: {
          stateCode: updatedData?.stateName?.['value'] || updatedData?.state,
          districtCode:
            updatedData?.districtName?.['value'] || updatedData?.district,
        },
      });
    }
  }, [updatedData]);

  useEffect(() => {
    const assemblyoptions =
      GetConstitutionsByDistrictsData?.getConstitutionsByDistricts[0].constitutionName.map(
        (constitutionName) => ({
          label: constitutionName,
          value: constitutionName,
        })
      );

    setAssemblyData(assemblyoptions);
  }, [GetConstitutionsByDistrictsData]);

  useEffect(() => {
    if (updatedData) {
      const assemblyDistrictCode =
        updatedData?.assemblyConstName?.['value']?.split('-')[0] ||
        updatedData?.assemblyConst;

      getAllPollingStation({
        variables: {
          state: updatedData?.stateName?.['value'] || updatedData?.state,
          district:
            updatedData?.districtName?.['value'] || updatedData?.district, // Make sure district is an integer
          assemblyConst: parseInt(assemblyDistrictCode), // Convert district code to integer
        },
      });
    }
  }, [updatedData]);

  useEffect(() => {
    let pollingoptions = [];

    if (PollingStationData?.getPollingStations?.length > 0) {
      pollingoptions = [
        { label: 'ALL', value: 0 },
        ...PollingStationData.getPollingStations.map((polling) => ({
          label: `${polling.pollingStationName}-${polling.pollingStationCode}`,
          value: polling.pollingStationCode,
        })),
      ].sort((a, b) => a.value - b.value);
    }

    setPollingData(pollingoptions);
  }, [PollingStationData]);

  const handleEditClick = () => {
    // Set the editing state and editedRowIndex
    setIsEditing(true);
  };

  const handleChange = (newValue, name) => {
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  const onSubmit = () => {
    const variables = {
      input: {
        state: updatedData?.stateNames?.value,
        district: +updatedData?.districtNames?.value,
        assemblyConst: +updatedData?.assemblyConstNames.value?.split('-')[0],
        userId: userId,
        pollingStations: updatedData?.pollingStationData?.map(
          (item) => item.value
        ),
        writeAccess: updatedData?.writeAccess?.map((item) => item.value),
      },
    };

    createAssignedConst({ variables });
    setIsEditing(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onDelete = () => {
    const variables = {
      id: updatedData?.id,
    };
    deleteAssignedConstituency({ variables });
  };

  return (
    <Grid my={2} mt={3}>
      <BackdropLoader loading={loading} />
      <div>
        {isEditing ? (
          <Grid className="assign-edit" spacing={2}>
            <Grid>
              <HrmBlackBtn
                label={t('Cancel')}
                onClick={() => setIsEditing(false)}
              />
            </Grid>
            <Grid className="assign-cancel">
              <HrmYellowSubmitBtn label={t('Submit')} onClick={onSubmit} />
            </Grid>
          </Grid>
        ) : (
          <Grid className="assign-edit" spacing={2}>
            <Grid>
              <HrmBlackBtn label={t('Edit')} onClick={handleEditClick} />
            </Grid>
            <Grid className="assign-cancel">
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
            </Grid>
          </Grid>
        )}
        <Grid container>
          <Grid xs={12} sm={6} md={6} container alignItems={'center'} my={1}>
            <Grid item xs={12} sm={6} md={4} className="firstgrid">
              <Typography px={2}>
                {t('STATE')} <span className="title-imp">*</span>:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={7} className="textgrid">
              <AutocompleteDropdown
                name="stateNames"
                onChange={(e, val) => handleChange(val, 'stateNames')}
                options={stateData || []}
                value={updatedData?.stateNames || ''}
                isOptionEqualToValue={(option, value) =>
                  option?.value === value?.label
                }
                label="State"
                // disabled={!isEditing}
                disabled
              />
            </Grid>
          </Grid>
          <Grid xs={12} sm={6} md={6} container alignItems={'center'} my={1}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography px={2}>
                {t('DISTRICT')} <span className="title-imp">*</span>:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={7} className="textgrid">
              <AutocompleteDropdown
                name="districtNames"
                onChange={(e, val) => handleChange(val, 'districtNames')}
                options={districtData || []}
                value={updatedData?.districtNames || ''}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value
                }
                label="District Name"
                // disabled={!isEditing}
                disabled
              />
            </Grid>
          </Grid>
          <Grid xs={12} sm={6} md={6} container alignItems={'center'} my={1}>
            <Grid item xs={12} sm={6} md={4} className="firstgrid">
              <Typography px={2}>
                {t('ASSEMBLY')} <span className="title-imp">*</span>:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={7} className="textgrid">
              <AutocompleteDropdown
                name="assemblyConstNames"
                onChange={(e, val) => handleChange(val, 'assemblyConstNames')}
                options={assemblyData || []}
                value={updatedData?.assemblyConstNames || ''}
                isOptionEqualToValue={(option, value) =>
                  option?.value === value?.label
                }
                label="assemblyConstName"
                // disabled={!isEditing}
                disabled
              />
            </Grid>
          </Grid>
          <Grid xs={12} sm={6} md={6} container alignItems={'center'} my={1}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography px={2}>
                {t('POLLING')} <span className="title-imp">*</span>:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={7} className="textgrid">
              <AutoCompleteMultiple
                name={`pollingStationData`}
                options={pollingData || []}
                value={updatedData?.pollingStationData || []}
                onChange={(e, val) => handleChange(val, 'pollingStationData')}
                label="Polling Stations"
                disabled={!isEditing}
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
                onChange={(e, val) => handleChange(val, 'writeAccess')}
                options={
                  updatedData?.pollingStationData[0]?.value === 0
                    ? pollingData
                    : updatedData?.pollingStationData || []
                }
                label="Write Access"
                value={updatedData?.writeAccess || []}
                disabled={!isEditing}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};
export default MultipleAssignedConstituency;
