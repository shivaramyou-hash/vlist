import { useEffect, useState } from 'react';
import { jsonData } from '../pages/Admin/jsonData';

function ExtractVoterData() {
  const [voters, setVoters] = useState([]);
  const [error, setError] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const jsonTotalData = jsonData;

  useEffect(() => {
    try {
      const parsedData = JSON.parse(jsonTotalData);
      // Handle different JSON structures (array or object)
      const voterArray = Array.isArray(parsedData)
        ? parsedData
        : parsedData.voters; // Assuming "voters" key if object

      const extractedVoters = voterArray.map((voter) => ({
        voterId: voter.voterID || 'N/A', // Handle missing data with default values
        name: voter.name || 'N/A',
        fatherName: voter.husbandFatherName || 'N/A',
        houseNumber: voter.houseNumber || 'N/A',
        age: voter.age || 'N/A',
        gender: voter.gender || 'N/A',
      }));

      setVoters(extractedVoters);
    } catch (error) {
      setError(error);
    }
  }, [jsonTotalData]);

  return { voters, error };
}

export default ExtractVoterData;
