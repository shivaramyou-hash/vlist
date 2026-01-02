export const types = `
type districts {
   stateCode:String
   districtName:String
   districtCode:Int
}



  `;

export const queries = `
getDistrictsByState(stateCode:String):[districts]
`;

export const mutations = `
`;
