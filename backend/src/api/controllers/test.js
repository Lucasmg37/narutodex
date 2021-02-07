
module.exports = {
  index: async (req, res) => {
    res.send({
      status: true,
      message: 'Search succesfully.',
      data: {}
    }).status(200)
  }
}
