const Boom = require('boom');
const { jwtsecret } = require('config');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { Player } = require('../../models');

const router = new Router();

router.post('/', (req, res, next) => {
  var reqtoken = req.headers['Authorization'];
   if (!reqtoken ) throw Boom.conflict('No token');
  const player = new Player(req.body);
  
  player
    .save()
    .then(() => {
         
      res.status(201).send({
        success: true,
        token: getToken(player),
        player
      });
    }).catch(next);
});



const getToken = player => jwt.sign({ playerId: player._id }, jwtsecret);

module.exports = router;
