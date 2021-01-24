const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

router.get('/', function (req, res) {
  let filter = {};

  if (req.query.location) {
    filter['class_code.location._id'] = new ObjectID(req.query.location);
  }

  if (req.query.group) {
    filter['class_code.group._id'] = new ObjectID(req.query.group);
  }

  if (req.query.type) {
    filter['class_code.type'] = req.query.type;
  }

  if (req.query.module) {
    filter['class_code.syllabus._id'] = new ObjectID(req.query.module);
  }

  if (req.query.lesson) {
    filter['class_code.lesson._id'] = new ObjectID(req.query.lesson);
  }

  client
    .db('attendance')
    .collection('students')
    .find(filter)
    .toArray()
    .then((locations) => res.status(200).send(locations).end())
    .catch((error) => res.status(500).send(error).end());
});


const URI = process.env.DATABASE_URI;
const ObjectID = mongodb.ObjectID;
const client = new mongodb.MongoClient(URI, { useUnifiedTopology: true });
client.connect();
module.exports = router;
