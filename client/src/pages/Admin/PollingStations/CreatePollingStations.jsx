import BackdropLoader from '@/components/Loader';
import { Card, Grid } from '@mui/material/';
import Papa from 'papaparse';
import { useState } from 'react';
import { HrmYellowBtn } from '../../../components/Button/Buttons';
import UploadComponent from '../../../components/Inputs/uploadComponent';
import useAdmin from '../useAdmin';

const CreatePollingStations = () => {
  const [parsedData, setParsedData] = useState([]);

  const [file, setFile] = useState();
  const { createPollingStations, loading } = useAdmin();

  const recordsPerChunk = 500;

  const handelJsonSubmit = async () => {
    try {
      const totalChunks = Math.ceil(parsedData.length / recordsPerChunk);
      for (let i = 0; i < totalChunks; i++) {
        const start = i * recordsPerChunk;
        const end = start + recordsPerChunk;
        const psNamesChunk = parsedData.slice(start, end);

        try {
          const variables = {
            input: {
              data: JSON.stringify(psNamesChunk),
            },
          };
          await createPollingStations({ variables });
        } catch (error) {
          console.error(error);
        }

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
            return {
              ...item,
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
            <h3>{'Upload Polling Stations Data Here'}</h3>
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
                  setFile(e.target.value);
                  handleCsvUpload(e);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} style={{ textAlign: 'left' }}>
              <HrmYellowBtn onClick={handelJsonSubmit} label={'Submit'} />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default CreatePollingStations;
