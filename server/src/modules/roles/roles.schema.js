export const types = `
type roles {
    roleId:Int
    role:String 
}

type multipleRoles{
role:[String]
}

input multipleRolesInput{
    roles:[String]
}

input createRolesInput{
    multipleRoles:multipleRolesInput
}

input updateRoleInput{
    roleId:Int
    role:String 
}
`;

export const mutations = `
createRole(input:createRolesInput) : roles
updateRole(input:updateRoleInput):Boolean
deleteRole(roleId:Int): Boolean
`;

export const queries = `
getRoles:[roles]
getRoleById(roleId:Int):roles
`;
