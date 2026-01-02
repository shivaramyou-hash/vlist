import AutocompleteDropdown from '@/components/Inputs/AutocompleteDropdown';
import BackdropLoader from '@/components/Loader';
import { Box, Card, Grid } from '@mui/material/';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { HrmYellowBtn } from '../../components/Button/Buttons';
import UploadComponent from '../../components/Inputs/uploadComponent';
import toast from '../../components/Toast';
import useAdmin from './useAdmin';

const AdminUpload = () => {
  const [states, setStates] = useState('');
  const [district, setDistrict] = useState('');
  const [assemblyConst, setAssemblyConst] = useState('');
  const [assemblyOptions, setAssemblyOptions] = useState('');
  const [parsedData, setParsedData] = useState([]);

  const [stateOptions, setStateOptions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [file, setFile] = useState();
  const {
    createVoter,
    getAllStates,
    getAllStatesData,
    getDistrictsByState,
    getDistrictsByStateData,
    GetConstitutionsByDistricts,
    GetConstitutionsByDistrictsData,
    loading,
  } = useAdmin();

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

  const recordsPerChunk = 500;

  const handelJsonSubmit = async () => {
    try {
      // const psNames = Object.keys(parsedData);
      const totalChunks = Math.ceil(parsedData.length / recordsPerChunk);
      for (let i = 0; i < totalChunks; i++) {
        const start = i * recordsPerChunk;
        const end = start + recordsPerChunk;
        const psNamesChunk = parsedData.slice(start, end);

        try {
          const variables = {
            input: {
              data: JSON.stringify(psNamesChunk),
              state: states['value'],
              district: district['value'],
              assemblyConst: +assemblyConst['value'],
            },
          };
          await createVoter({ variables });
          toast.success(`Uploaded chunk ${i + 1}/${totalChunks}`);
        } catch (error) {
          // console.error(error);
        }
        // });

        // await Promise.all(promises);
      }
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  const handleCsvUpload = (event) => {
    try {
      Papa?.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const formattedData = results.data.map((item) => {
            const {
              // eslint-disable-next-line no-unused-vars
              'Short URL': shortUrl,
              // eslint-disable-next-line no-unused-vars
              'Digital Letter': digitalLetter,
              ...remainingProperties
            } = item;

            return {
              ...remainingProperties,
            };
          });

          setParsedData(formattedData);
        },
      });
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <>
      <BackdropLoader loading={loading} />
      <Card>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
            <h3>{'Upload Voter List'}</h3>
          </Grid>

          <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
            <h4>{'Upload Document Here'}</h4>
          </Grid>
          <Grid container className="sortgrid">
            <Grid item xs={12} sm={12} md={12} container ml={2}>
              <Grid item xs={12} sm={12} md={4} p={1}>
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

              <Grid item xs={12} sm={12} md={4} p={1}>
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
              <Grid item xs={12} sm={12} md={4} p={1}>
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
                  // const list = e?.target?.files[0];
                  setFile(e.target.value);
                  // handleChange(e, profile, true, "userDetails");
                  handleCsvUpload(e);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} style={{ textAlign: 'left' }}>
              <HrmYellowBtn
                onClick={handelJsonSubmit}
                label={'Submit'}
                // disabled={!parsedData}
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default AdminUpload;
