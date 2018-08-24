const Boom = require('boom');
const { jwtsecret } = require('config');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User } = require('../../models');

const router = new Router();

router.post('/', (req, res, next) => {
  const { password, confirm_password } = req.body;
  if (!password || !confirm_password || password !== confirm_password) throw Boom.conflict('Passwords do not match');
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send({
        success: true,
        token: getToken(user),
        user
      });
    }).catch(next);
});

router.put('/:id', (req, res,next) => {
        User.findById(req.param('id'), function(err, user){
                      user.first_name=req.body.first_name;
                       user.last_name=req.body.last_name;
                       user.email=req.body.email;
                       user.password=req.body.password;
                      
                      
        user
                      .save()
                      .then(() => {
                            res.status(200).send({
                                                 success: true,
                                                 token: getToken(user),
                                                 user
                                                 });
                            }).catch(next);
        });
});

const getToken = user => jwt.sign({ userId: user._id }, jwtsecret);

module.exports = router;
