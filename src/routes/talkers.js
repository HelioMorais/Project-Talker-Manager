const fs = require('fs').promises;
const { join } = require('path');

async function readFile() {
  try {
    const data = await fs.readFile(join(__dirname, '../talker.json'), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error.message}`);
  }
}

module.exports = {
  readFile,
};