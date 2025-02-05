const { GET_CHARACTERS_IMAGE_DOWNLOAD, POPULAR_BASE_DE_DADOS } = require('../constants')

const questionsStart = {
  type: 'list',
  name: 'O que você deseja fazer?',
  choices: [
    { name: 'Realizar Busca e Tratamento de todas as informações', value: 1 },
    { name: 'Realizar somente Busca de uma informação', value: 2 },
    { name: 'Realizar somente Tratamento de uma informação', value: 3 },
    { name: 'Personagem: Download de Imagens', value: GET_CHARACTERS_IMAGE_DOWNLOAD },
    { name: 'Popular base de dados', value: POPULAR_BASE_DE_DADOS }
  ]
}

const questionsTreatment = {
  type: 'list',
  name: 'Qual informação você deseja Processar?',
  choices: [
    { name: 'Characters', value: 3 },
    { name: 'Jutsus', value: 2 },
    { name: 'Stamps', value: 1 }
  ]
}

const questionsTreatmentJutsus = {
  type: 'list',
  name: 'Qual informação de Jutsus você deseja processar?',
  choices: [
    { name: 'Descrição', value: 1 },
    { name: 'Rank', value: 2 }
  ]
}

const questionsGet = {
  type: 'list',
  name: 'Qual informação você deseja Buscar?',
  choices: [
    { name: 'Jutsus', value: 2 },
    { name: 'Characters', value: 1 }
  ]
}

const questionsCharacter = {
  type: 'list',
  name: 'Qual informação você deseja buscar dos Personagens?',
  choices: [
    { name: 'Imagens', value: 2 },
    { name: 'Download Image', value: GET_CHARACTERS_IMAGE_DOWNLOAD },
    { name: 'Todos os dados', value: 1 }
  ]
}

const questionsTreatmentCharacter = {
  type: 'list',
  name: 'Qual informação você deseja processar dos Personagens?',
  choices: [
    { name: 'Description', value: 1 }
  ]
}

module.exports = { questionsStart, questionsTreatmentCharacter, questionsTreatment, questionsTreatmentJutsus, questionsGet, questionsCharacter }
