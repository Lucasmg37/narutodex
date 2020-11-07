const { default: Axios } = require('axios')

module.exports = Axios.create({
  baseURL: 'https://naruto.fandom.com'
})
