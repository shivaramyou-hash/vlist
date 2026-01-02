export const types = `
type pollingStations {
   data:String
    id: Int
    pollingStationName: String
    pollingStationCode: Int
    pollingStationAddress: String
    state: String
    district: Int
    assemblyConst: Int
}

type pollingData {
    id: Int
    pollingStationName: String
    pollingStationCode: Int
    pollingStationAddress: String
    state: String
    district: Int
    assemblyConst: Int
}


input createPollingStationsInput {
  data:String
}
 input assigedPollingstationsInput {
  state:String,district:Int,assemblyConst:Int,userId:String
}

  `;

export const queries = `
getPollingStations(state:String,district:Int,assemblyConst:Int):[pollingData]
getAssignedPollingStations(input:assigedPollingstationsInput):[pollingData]
`;

export const mutations = `
createPollingStations(input : createPollingStationsInput) : pollingStations
`;
