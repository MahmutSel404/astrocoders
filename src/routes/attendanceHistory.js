const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//Student Attendance History-------------------------------------------------------------------------------------
router.get('/', function (req, res) {
  // const searchObject = {email: req.query.email};

  client
    .db('attendance')
    .collection('students')
    // .filter((user) => user.email === searchObject)
    .find({ email: { $eq: req.query.email } })
    .toArray(function (error, tracks) {
      res.send(error || tracks);
    });
});

const URI = process.env.DATABASE_URI;
const ObjectID = mongodb.ObjectID;
const client = new mongodb.MongoClient(URI, { useUnifiedTopology: true });
client.connect();
module.exports = router;
