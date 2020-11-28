const { default: Axios } = require('axios')

module.exports = Axios.create({
  baseURL: 'http://localhost:3333/api/v1/'
})
