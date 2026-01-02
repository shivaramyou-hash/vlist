export const types = `
type voter {
   data:String
}

type votersAccessData {
  voters: [voterList]
  writeAccess: Boolean
}

type voterList {
  id: Int
  psNo :Int
  psName:String
  psAddress :String
  SLNo :Int
  voterName:String
  houseNumber :String
  address :String
  relationType:String
  age:String
  gender:String
  EPIC:String
  mobileNumber:String
  district:Int
  state:String
  assemblyConst:Int
  status:String
  notes:String
  isDeleted: Boolean

}

input createVotersInput {
  data:String
  state:String
   district:Int
  assemblyConst:Int
}

input getVotersByPoll {
  state: String
  district: Int
  assemblyConst : Int
  pollingStationCode: Int
}

input getVotersAccessByPoll {
  state: String
  district: Int
  assemblyConst : Int
  pollingStationCode: Int
  userId:String
}


type voterMessage {
  updatedEPICs: [String]
  createdEPICs: [String]
}


input updateVoterInput {
  state:String
  district:Int
  assemblyConst: Int
  psNo:Int
  data:String
}

  `;

export const queries = `
 getAllVoters: [voterList]
 getVotersByPollingStation(input:getVotersByPoll) : [voterList]
 getVotersAccessByPollingStation(input:getVotersAccessByPoll) : votersAccessData
`;

export const mutations = `
createVoter(input:createVotersInput) : voterMessage
updateSingleVoter(input : updateVoterInput) : Boolean
`;
