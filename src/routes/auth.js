const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//@route    POST login/create-user
//desc      auth user

router.post('/', function (req, res) {
  var userParam = {
    socialId: req.body.socialId,
    displayName: req.body.displayName,
    email: req.body.email,
  };

  client
    .db('admins')
    .collection('user')
    .findOne({ email: userParam.email })
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      user = {};
      user.email = userParam.email;
      user.name = userParam.displayName;
      user.role = 'student';
      user.password = '';
      client
        .db('admins')
        .collection('user')
        .insertOne(user)
        .then((res) => res.status(200).send(user))
        .catch((error) => res.status(500).send(error));
    })
    .catch((error) => res.status(500).send(error));
});

const URI = process.env.DATABASE_URI;
const client = new mongodb.MongoClient(URI, { useUnifiedTopology: true });
client.connect();
module.exports = router;
