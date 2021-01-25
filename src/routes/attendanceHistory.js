const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();


//@route    GET /studentsView/history
//desc      attendance history of stude

router.get('/', function (req, res) {

  client
    .db('attendance')
    .collection('students')
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
