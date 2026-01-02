export const viewcotercols = [
  {
    name: 'EPIC',
    col: 'EPIC',
  },
  {
    name: ' SLNo',
    col: 'SLNo',
  },
  {
    name: 'Voter Name',
    col: 'voterName',
  },
  // {
  //   name: 'House Number',
  //   col: 'houseNumber',
  // },
  {
    name: 'Age',
    col: 'age',
  },
  {
    name: 'Gender',
    col: 'gender',
  },
  { name: 'Address', col: 'houseNumber' },
  // {
  //   name: 'Date of Publication',
  //   col: 'dateOfPublication',
  // },
];

export const viewUserCols = [
  { name: 'User Id', col: 'userId' },
  { name: 'First Name', col: 'firstName' },
  { name: 'Last Name', col: 'lastName' },
  { name: 'Email Id', col: 'email' },
  { name: '', col: 'deleteButton' },
];

export const roleCols = [
  { name: 'Role ID', col: 'roleId' },
  { name: 'Role', col: 'role' },
];

export const roleClickable = [{ col: 'roleId', link: '/editRole' }];

export const userClickable = [
  {
    col: 'userId',
    link: '/edituser',
  },
];

export const assignUserCols = [
  { name: 'User Id', col: 'userId' },
  { name: 'First Name', col: 'firstName' },
  { name: 'Last Name', col: 'lastName' },
];

export const assignClickable = [
  {
    col: 'userId',
    link: '/editAssignConstituency/',
    params: true,
  },
];

// export const extractedVoterListCols = [
//   { name: 'User Id', col: 'userId' },
//   { name: 'State', col: 'state' },
//   { name: 'District', col: 'district' },
//   { name: 'Assembly Constituency', col: 'assemblyConst' },
//   { name: 'Polling Station', col: 'pollingStation' },
//   { name: 'Download', col: 'downloadBtn' },
// ];
export const extractedInputVoterListCols = [
  { name: 'User Id', col: 'userId' },
  { name: 'State', col: 'state' },
  { name: 'District', col: 'district' },
  { name: 'Assembly Constituency', col: 'assemblyConst' },
  { name: 'Polling Station', col: 'pollingStation' },
  { name: 'Created On', col: 'createdOn' },
  { name: 'Status', col: 'status' },
];
