import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AutocompleteDropdown from '@/components/Inputs/AutocompleteDropdown.jsx';
import BackdropLoader from '@/components/Loader/index.jsx';
import useAdmin from '../Admin/useAdmin.js';
import useVoters from '../Dashboard/useVoters.js';
import ViewVotersTable from './ViewVotersTable.jsx';
import EditVoterDialog from './EditVoterDialog.jsx';

const ViewVoter = () => {
  const [votersList, setVotersList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [assemblyOptions, setAssemblyOptions] = useState([]);
  const [pollingData, setPollingData] = useState([]);
  const [polling, setPolling] = useState('');
  const [stateData, setStateData] = useState([]);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [assembly, setAssembly] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentVoter, setCurrentVoter] = useState(null);
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
    if (state && district && assembly) {
      const assemblyDistrictCode = assembly.value.split('-')[0];
      const variables = {
        input: {
          state: state.value,
          district: district['value'],
          assemblyConst: parseInt(assemblyDistrictCode),
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
        district: parseInt(district.value),
        assemblyConst: parseInt(assemblyDistrictCode),
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

  const handleEditVoter = (voter) => {
    setCurrentVoter(voter);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentVoter(null);
  };

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
    const updatedVoters = votersList?.voters?.map(v => v.EPIC === data.EPIC ? data : v);
    setVotersList(prev => ({...prev, voters: updatedVoters}));
    
    const key = `${state.value}-${parseInt(district.value)}-${parseInt(assemblyDistrictCode)}-${polling.value}`;
    const newCacheData = {...votersList, voters: updatedVoters};
    localStorage.setItem(key, JSON.stringify(newCacheData));
    handleCloseDialog();
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">View Voter List</h3>
      </div>
      
      <BackdropLoader loading={loading || voterLoading} />
      
      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <AutocompleteDropdown
            className="w-full"
            onChange={(e, val) => { setState(val); setVotersList([]); }}
            options={stateData || []}
            name="state"
            value={state || ''}
            isOptionEqualToValue={(option, value) => option?.value === value?.label}
            getOptionLabel={(option) => option?.label || ''}
            label="State"
          />
           <AutocompleteDropdown
            className="w-full"
            onChange={(e, val) => { setDistrict(val); setVotersList([]); }}
            options={districtData || []}
            name="district"
            value={district || ''}
            isOptionEqualToValue={(option, value) => option?.label === value}
            getOptionLabel={(option) => option?.label || ''}
            label="District"
          />
           <AutocompleteDropdown
            className="w-full"
            onChange={(e, val) => { setAssembly(val); setVotersList([]); setPolling(''); }}
            options={assemblyOptions || []}
            name="assembly"
            value={assembly || ''}
            isOptionEqualToValue={(option, value) => option?.label === value}
            getOptionLabel={(option) => option?.label || ''}
            label="Assembly Constituency"
          />
           <AutocompleteDropdown
            className="w-full"
            onChange={(e, val) => { setPolling(val); getVotersData(val); }}
            options={pollingData || []}
            name="pollingstation"
            value={polling || ''}
            isOptionEqualToValue={(option, value) => option?.label === value}
            getOptionLabel={(option) => option?.label || ''}
            label="Polling Station"
          />
        </div>

        {/* Search Bar - Full Width & Aligned */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search by Voter Name / EPIC"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <ViewVotersTable
          votersList={{
            ...votersList,
            voters: votersList?.voters?.filter(
              (voter) =>
                voter?.voterName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
                voter?.EPIC?.toLowerCase()?.includes(searchText?.toLowerCase())
            ),
          }}
          handleEditVoter={handleEditVoter}
        />
      </div>

      {openDialog && (
        <EditVoterDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          voterData={currentVoter}
          handleSave={handleUpdateVoter}
        />
      )}
    </div>
  );
};

export default ViewVoter;
