class IUserRepository {
    async getUser(include = null) {
      throw new Error('createUser method not implemented');
    }

    async createUser(userData) {
      throw new Error('createUser method not implemented');
    }
  
    async getUserById(id, include = null) {
      throw new Error('getUserById method not implemented');
    }

    async getUserByEmail(email, include = null) {
      throw new Error('getUserById method not implemented');
    }
  
    async updateUser(id, updatedData) {
      throw new Error('updateUser method not implemented');
    }
  
    async deleteUser(userId) {
      throw new Error('deleteUser method not implemented');
    }
  }
  
  module.exports = IUserRepository;
  