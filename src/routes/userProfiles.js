const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//@route    GET admin/users
//desc      get user
router.get('/', function (req, res) {
  client
    .db('admins')
    .collection('user')
    .find({})
    .toArray()
    .then((user) => res.status(200).send(user).end())
    .catch((error) => res.status(500).send(error).end());
});

//@route    PUT admin/users
//desc      update user
router.post('/:id', function (req, res) {
  client
    .db('admins')
    .collection('user')
    .findOneAndUpdate(
      { _id: new ObjectID(req.params.id) },
      { $set: { role: req.body.role } }
    )
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(500).send(error));
});

//@route    DELETE admin/users
//desc      delete user
router.delete('/:id', function (req, res) {
  const id = new mongodb.ObjectID(req.params.id);
  const searchObject = { _id: id };
  client
    .db('admins')
    .collection('user')
    .deleteOne(searchObject)
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(500).send(error));
});

const URI = process.env.DATABASE_URI;
const ObjectID = mongodb.ObjectID;
const client = new mongodb.MongoClient(URI, { useUnifiedTopology: true });
client.connect();
module.exports = router;
