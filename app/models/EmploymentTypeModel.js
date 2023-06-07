const prisma = require('../../config/prisma');

class EmploymentTypeModel {
    
    async execute(method, ...args) {
      if (!(method in prisma.employmentType)) {
        throw new Error(`Method '${method}' is not supported.`);
      }
    
      return prisma.employmentType[method](...args);
    }
  }
  
  module.exports = new EmploymentTypeModel();
  