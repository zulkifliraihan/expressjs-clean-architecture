const IRoleRepository = require("./IRoleRepository");
const RoleModel = require("../../models/RoleModel");

class RoleRepository extends IRoleRepository{

    async getRole() { 
        const syntax = 'findMany'
        const result = await RoleModel.execute(syntax);

        return result
    }

    async createRole(roleData) {

        const syntax = 'create'
        const data = {
            data: roleData
        }

        const result = await RoleModel.execute(syntax, data)

        return result
    }

    async getRoleById(id) {
        const syntax = 'findUnique'
        const data = {
            where: {
                id
            }
        }

        const result = await RoleModel.execute(syntax, data)

        return result
    }


    async updateRole(id, roleData) {

        const syntax = 'update'
        const data = {
            where: {
                id
            },
            data: roleData
        }

        const result = await RoleModel.execute(syntax, data)

        return result
    }

    async deleteRole(id) {
        const syntax = 'delete'
        const data = {
            where: {
                id
            }
        }

        const result = await RoleModel.execute(syntax, data)

        return result
    }
    
}

module.exports = new RoleRepository()