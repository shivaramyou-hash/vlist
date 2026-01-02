import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CREATE_VOTER,
  GET_ALL_VOTERS,
  GET_ALL_STATES,
  GET_DISTRICTS_BY_STATES,
  GET_CONSTITUTIONS_BY_DISTRICTS,
  GET_POLLING_STATIONS,
  CREATE_POLLING_STATIONS,
  GET_VOTERS_POLLING_STATION,
  GET_ASSIGNED_POLLING_STATIONS,
  GET_ASSEIGNED_CONSTITUTIONS_BY_DISTRICTS,
  GET_VOTERS_ACCESS_BY_POLLING_STATION,
} from '../../services/mutations';
import toast from '../../components/Toast';

const useAdmin = () => {
  const [
    createVoter,
    { data: createVoterData, loading: createVoterDataLoading },
  ] = useMutation(CREATE_VOTER, {
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request

    // onCompleted: (res) => {
    //   toast.success('Data uploaded successfully!');
    // },
    onError: (error) => {
      toast.error('An error occurred while uploading data.');
      console.error('Error uploading data:', error);
    },
  });
  const [
    createPollingStations,
    { data: createPollingStationsData, loading: createPollingStationsLoading },
  ] = useMutation(CREATE_POLLING_STATIONS, {
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request

    onCompleted: (res) => {
      toast.success('Data uploaded successfully!');
    },
    onError: (error) => {
      toast.error('An error occurred while uploading data.');
      console.error('Error uploading data:', error);
    },
  });

  const [
    getAllVoters,
    { loading: getAllVotersLoading, data: getAllVotersData },
  ] = useLazyQuery(GET_ALL_VOTERS);

  const [
    getAllStates,
    { loading: getAllStatesLoading, data: getAllStatesData },
  ] = useLazyQuery(GET_ALL_STATES);
  const [
    getDistrictsByState,
    { loading: getDistrictsByStateLoading, data: getDistrictsByStateData },
  ] = useLazyQuery(GET_DISTRICTS_BY_STATES);

  const [
    GetConstitutionsByDistricts,
    {
      loading: GetConstitutionsByDistrictsLoading,
      data: GetConstitutionsByDistrictsData,
    },
  ] = useLazyQuery(GET_CONSTITUTIONS_BY_DISTRICTS);
  const [
    GetAssignedConstitutionsByDistrict,
    {
      loading: GetAssignedConstitutionsByDistrictLoading,
      data: GetAssignedConstitutionsByDistrictData,
    },
  ] = useLazyQuery(GET_ASSEIGNED_CONSTITUTIONS_BY_DISTRICTS);

  const [
    getAllPollingStation,
    { loading: getPollingStationLoading, data: PollingStationData },
  ] = useLazyQuery(GET_POLLING_STATIONS);
  const [
    getAssignedPollingStations,
    {
      loading: getAssignedPollingStationsLoading,
      data: getAssignedPollingStationsData,
    },
  ] = useLazyQuery(GET_ASSIGNED_POLLING_STATIONS, {
    fetchPolicy: 'no-cache',
  });

  const [
    getVotersByPollingStation,
    {
      loading: getVotersByPollingStationLoading,
      data: getVotersByPollingStationData,
    },
  ] = useLazyQuery(GET_VOTERS_POLLING_STATION, {
    fetchPolicy: 'no-cache',
  });
  const [
    getVotersAccessByPollingStation,
    {
      loading: getVotersAccessByPollingStationLoading,
      data: getVotersAccessByPollingStationData,
    },
  ] = useLazyQuery(GET_VOTERS_ACCESS_BY_POLLING_STATION, {
    fetchPolicy: 'no-cache',
  });
  return {
    loading:
      createVoterDataLoading ||
      getAllVotersLoading ||
      getAllStatesLoading ||
      getDistrictsByStateLoading ||
      createPollingStationsLoading ||
      GetConstitutionsByDistrictsLoading ||
      getVotersByPollingStationLoading ||
      getAssignedPollingStationsLoading ||
      GetAssignedConstitutionsByDistrictLoading ||
      getVotersAccessByPollingStationLoading,
    createVoter,
    createVoterData,
    getAllVoters,
    getAllVotersData,
    getAllStates,
    getAllStatesData,
    getDistrictsByState,
    getDistrictsByStateData,
    GetConstitutionsByDistricts,
    GetConstitutionsByDistrictsData,
    getAllPollingStation,
    getPollingStationLoading,
    PollingStationData,
    createPollingStations,
    createPollingStationsData,
    getVotersByPollingStation,
    getVotersByPollingStationData,
    getAssignedPollingStationsData,
    getAssignedPollingStations,
    GetAssignedConstitutionsByDistrict,
    GetAssignedConstitutionsByDistrictData,
    getVotersAccessByPollingStation,
    getVotersAccessByPollingStationData,
  };
};

export default useAdmin;
