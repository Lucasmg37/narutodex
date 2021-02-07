const { default: Axios } = require('axios');

module.exports = Axios.create({
  baseURL: process.env.api,
});
