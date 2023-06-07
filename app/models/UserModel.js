const prisma = require('../../config/prisma');

class UserModel {
    
    async execute(method, ...args) {
      if (!(method in prisma.user)) {
        throw new Error(`Method '${method}' is not supported.`);
      }
    
      return prisma.user[method](...args);
    }
  }
  
  module.exports = new UserModel();
  