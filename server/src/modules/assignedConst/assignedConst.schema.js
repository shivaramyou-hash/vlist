export const types = `
type assignedConst {
    userId: String
    district: Int
    assemblyConst: Int
    pollingStations: [Int]
    state:String
    writeAccess: [Int]
    stateName: String
    stateData: states
    districtName: String
    assemblyConstName: String
    pollingStationNames: [String]
    id:Int
  }

 
   `;

export const queries = `
getAssignedConstitutionsByUser(userId:String):[assignedConst]

`;

export const mutations = `
deleteAssignedConstituency(id:Int!) :Boolean
`;
