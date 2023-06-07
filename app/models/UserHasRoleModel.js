const prisma = require('../../config/prisma');

class UserHasRoleModel {
    
    async execute(method, ...args) {
      if (!(method in prisma.userHasRole)) {
        throw new Error(`Method '${method}' is not supported.`);
      }
    
      return prisma.userHasRole[method](...args);
    }
  }
  
  module.exports = new UserHasRoleModel();
  