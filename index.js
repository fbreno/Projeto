// Main.js
const fs = require('fs');
const GitHubService = require('./services/GitHubService');
const GitLabService = require('./services/GitLabService');

function loadConfig(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erro ao ler arquivo de configuração:`, error.message);
    process.exit(1);
  }
}

function getService(config) {
  if (config.service === 'gitlab') {
    return new GitLabService(config.gitlab.url, config.gitlab.token);
  } else if (config.service === 'github') {
    return new GitHubService(config.github.token);
  } else {
    console.error('Serviço especificado no arquivo de configuração está inválido.');
    process.exit(1);
  }
}

async function main() {
  if (process.argv.length !== 3) {
    console.error('Modo de usar: bun run index.js <caminho_arquivo_de_configuração>');
    process.exit(1);
  }

  const configFilePath = process.argv[2];
  const config = loadConfig(configFilePath);
  const service = getService(config);

  const searchQuery = 'tauk';
  const projects = await service.getProjects(searchQuery);

  console.log(`Projects from ${config.service} starting with "${searchQuery}":`, projects.map(project => project.name));
}

main();
