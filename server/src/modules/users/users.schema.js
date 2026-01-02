export const types = `
type user {
    userId: String
    firstName : String
    password:String
    email:String
    isActive:Boolean
    lastName:String
    phone:String
    assignedConst : [String]
    role:Int
    portalRole:Int
}

input createUserInput {
  userId: String
  firstName : String
  password:String
  email:String
  isActive:Boolean
  lastName:String
  phone:String
  role:Int
  portalRole:Int
}
input updateUserInput {
  userId: String
  firstName : String
  password:String
  email:String
  isActive:Boolean
  lastName:String
  phone:String
  assignedConst : [String]
  role:Int
  portalRole:Int
}

  type userLoginResponse {
    Token: String
    message: String
    userData: user
  }

  `;

export const queries = `
getUserById(userId:String):[user]
userLogin(email:String,password:String,orgId:Int):userLoginResponse
getAllUsers:[user]
`;

export const mutations = `
createUser(input:createUserInput) : user
updateUser(input:updateUserInput) : Boolean
deleteUser(userId:String) : Boolean
`;
