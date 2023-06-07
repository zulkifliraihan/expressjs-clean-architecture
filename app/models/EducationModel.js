const prisma = require('../../config/prisma');

class EducationModel {
    
    async execute(method, ...args) {
      if (!(method in prisma.education)) {
        throw new Error(`Method '${method}' is not supported.`);
      }
    
      return prisma.education[method](...args);
    }
  }
  
  module.exports = new EducationModel();
  