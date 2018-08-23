const Boom = require('boom');
const { jwtsecret } = require('config');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { Player } = require('../../models');

const router = new Router();

router.post('/', (req, res, next) => {
  //const { password, confirm_password } = req.body;
  //if (!password || !confirm_password || password !== confirm_password) throw Boom.conflict('Passwords do not match');
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


//const getToken = user => jwt.sign({ userId: user._id }, jwtsecret);

module.exports = router;
