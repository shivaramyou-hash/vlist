export const types = `
type assemblyConstituency {
   districtCode:Int
   constitutionName :[String]
}
 type assignedConst {
  userId: String
  state: String
  district: Int
  assemblyConst: Int
  pollingStations: [Int]
  writeAccess: [Int]
  id:Int

 }
 input assignedConstInput {
  userId: String
  state: String
  district: Int
  assemblyConst: Int
  pollingStations: [Int]
  writeAccess: [Int]

 }

 type assignedAssemblyConst {
   district: Int
    assemblyConstCode: Int
    assemblyConstName: String
 }

  `;

export const queries = `
getConstitutionsByDistricts(stateCode:String,districtCode:Int):[assemblyConstituency]
getAssignedConstitutionsByDistricts(stateCode:String,districtCode:Int,userId:String):[assignedAssemblyConst]
`;

export const mutations = `
createassignedConstity(input:assignedConstInput): assignedConst
`;
