const questionsStart = {
  type: 'list',
  name: 'O que você deseja fazer?',
  choices: [
    { name: 'Realizar Busca e Tratamento de todas as informações', value: 1 },
    { name: 'Realizar somente Busca de uma informação', value: 2 },
    { name: 'Realizar somente Tratamento de uma informação', value: 3 }
  ]
}

const questionsTreatment = {
  type: 'list',
  name: 'Qual informação você deseja Processar?',
  choices: [
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

module.exports = { questionsStart, questionsTreatment, questionsTreatmentJutsus }
