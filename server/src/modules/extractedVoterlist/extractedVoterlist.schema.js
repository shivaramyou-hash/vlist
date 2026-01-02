export const types = `
type extractedVoterlist {
   id:Int
   state:String
   district:String
   assemblyConst:Int
   pollingStation:Int
   url:String
   userId:String
   createdAt:String
   createdOn:String
   status:String 

} `;

export const queries = `
getExtractedVoterListByUserId(userId:String):[extractedVoterlist]
`;

export const mutations = `
`;
