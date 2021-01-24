const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//shows all classes
router.get('/', function (req, res) {
  client
    .db('admins')
    .collection('code')
    .find()
    .toArray((error, tracks) => {
      res.send(error || tracks);
    });
});

// get single class-----------------------------------------------------------------------------------------------------------------
router.get('/:id', function (req, res) {
  client
    .db('admins')
    .collection('code')
    .findOne({ _id: { $eq: new ObjectID(req.params.id) } })
    .then((result) => res.status(200).send(result).end())
    .catch((error) => res.status(500).send(error.message).end());
});




const URI = process.env.DATABASE_URI;
const ObjectID = mongodb.ObjectID;
const client = new mongodb.MongoClient(URI, { useUnifiedTopology: true });
client.connect();
module.exports = router;
