// GitHubService.js
const axios = require('axios');

class GitHubService {
  constructor(token) {
    this.baseUrl = 'https://api.github.com';
    this.token = token;
  }

  async getProjects(searchQuery) {
    try {
      const response = await axios.get(`${this.baseUrl}/projects`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          q: searchQuery,
        },
      });

      return response.data.items;
    } catch (error) {
      console.error(`Erro ao buscar projetos:`, error.message);
      return [];
    }
  }
}

module.exports = GitHubService;
