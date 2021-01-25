const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
var randomWords = require('random-words');

//@route    POST /admins
//desc      create unique, random and meaningful class code 

router.post('/', (req, res) => {
  const classCode = {
    location: {
      _id: new ObjectID(req.body.location._id),
      name: req.body.location.name,
    },
    group: {
      _id: new ObjectID(req.body.group._id),
      name: req.body.group.name,
    },
    type: req.body.type,
    date: new Date(req.body.date + ' ' + req.body.time),
    time: req.body.time,
    code: randomWords({ exactly: 2, join: ' ' }),
    syllabus: {
      _id: new ObjectID(req.body.syllabus._id),
      module: req.body.syllabus.module,
    },
    lesson: {
      _id: new ObjectID(req.body.lesson._id),
      name: req.body.lesson.name,
    },
  };

  client
    .db('admins')
    .collection('code')
    .insertOne(classCode)
    .then((result) =>
      res.status(200).send({ _id: result.ops[0]._id, ...classCode })
    )
    .catch((error) => res.status(500).send(error.message).end());
});

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
