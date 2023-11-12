// GitLabService.js
const axios = require('axios');

class GitLabService {
  constructor(url, token) {
    this.baseUrl = `${url}/api/v4`;
    this.token = token;
  }

  async getProjects(searchQuery) {
    try {
      const response = await axios.get(`${this.baseUrl}/projects`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          search: searchQuery,
        },
      });

      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar projetos:`, error.message);
      return [];
    }
  }
}

module.exports = GitLabService;
