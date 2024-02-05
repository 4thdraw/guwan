const express = require("express")
const datasend = express.Router();

datasend.post('/', (req, res) => {
  res.send(`${req.body.crud}`)
})

module.exports = datasend