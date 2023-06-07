const prisma = require('../../config/prisma');

class ExperienceModel {
    
    async execute(method, ...args) {
      if (!(method in prisma.experience)) {
        throw new Error(`Method '${method}' is not supported.`);
      }
    
      return prisma.experience[method](...args);
    }
  }
  
  module.exports = new ExperienceModel();
  