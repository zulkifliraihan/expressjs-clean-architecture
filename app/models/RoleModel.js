const prisma = require('../../config/prisma');

class RoleModel {
    
    async execute(method, ...args) {
      if (!(method in prisma.role)) {
        throw new Error(`Method '${method}' is not supported.`);
      }
    
      return prisma.role[method](...args);
    }
  }
  
  module.exports = new RoleModel();
  