class IEducationRepository {
    async getEducation() {
      throw new Error('createEducation method not implemented');
    }

    async createEducation(roleData) {
      throw new Error('createEducation method not implemented');
    }
  
    async getEducationById(id) {
      throw new Error('getEducationById method not implemented');
    }

    async updateEducation(id, roleData) {
      throw new Error('updateEducation method not implemented');
    }
  
    async deleteEducation(userId) {
      throw new Error('deleteEducation method not implemented');
    }
  }
  
  module.exports = IEducationRepository;
  