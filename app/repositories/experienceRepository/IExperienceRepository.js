class IExperienceRepository {
    async getExperience() {
      throw new Error('createExperience method not implemented');
    }

    async createExperience(roleData) {
      throw new Error('createExperience method not implemented');
    }
  
    async getExperienceById(id) {
      throw new Error('getExperienceById method not implemented');
    }

    async updateExperience(id, roleData) {
      throw new Error('updateExperience method not implemented');
    }
  
    async deleteExperience(userId) {
      throw new Error('deleteExperience method not implemented');
    }
  }
  
  module.exports = IExperienceRepository;
  