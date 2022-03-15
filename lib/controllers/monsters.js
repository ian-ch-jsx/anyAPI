const { Router } = require('express');
const Monster = require('../models/Monster');

module.exports = Router()
  .get('/', async (req, res) => {
    const monsters = await Monster.findAll();
    res.send(monsters);
  })

  .post('/', async (req, res) => {
    const monster = await Monster.insert(req.body);
    res.send(monster);
  });
