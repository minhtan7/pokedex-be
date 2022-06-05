var express = require('express');
var router = express.Router();
let pokemons = require("../pokemons.json")

router.get('/pokemons', function (req, res, next) {
  let { page, limit } = req.query
  page = page ? parseInt(page) : 1
  limit = limit ? parseInt(limit) : 20
  const offset = (page - 1) * limit
  const newData = { ...pokemons, page, limit }
  newData.data = pokemons.data.slice(offset, offset + limit)
  res.send(newData)
});

module.exports = router;
