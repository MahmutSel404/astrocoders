const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();


//syllabus 

router.get('/', function (req, res) {
  client
    .db('admins')
    .collection('syllabus')
    .find({})
    .toArray()
    .then((syllabus) => res.status(200).send(syllabus))
    .catch((error) => res.status(500).send(error));
});

router.post('/', function (req, res) {
  client
    .db('admins')
    .collection('syllabus')
    .insertOne({
      module: req.body.module,
      lesson: [],
    })
    .then((result) => res.status(200).send(result.ops[0]).end());
});

router.post('/:id/lesson', function (req, res) {
  var lesson = { _id: new ObjectID(), name: req.body.name };

  client
    .db('admins')
    .collection('syllabus')
    .findOneAndUpdate(
      // search operation
      { _id: { $eq: new ObjectID(req.params.id) } },

      // update operation
      { $push: { lesson: lesson } }
    )
    .then((result) => res.status(200).send(lesson).end())
    .catch((error) => res.status(500).send(error).end());
});

//delete lesson-------------
router.delete('/:id/lesson/:lessonId', function (req, res) {
  const id = new mongodb.ObjectID(req.params.id);
  const lessonId = new mongodb.ObjectID(req.params.lessonId);

  const searchObject = { _id: id };
  client
    .db('admins')
    .collection('syllabus')
    .findOne(searchObject)
    .then((module) => {
      const newLessons = module.lesson.filter(
        (lesson) => !lesson._id.equals(lessonId)
      );
      //location.groups.splice(index, 1);

      //console.log(location);

      client
        .db('admins')
        .collection('syllabus')
        .updateOne(searchObject, { $set: { lesson: newLessons } })
        .then((result) => res.status(200).send(result).end())
        .catch((error) => res.status(500).send(error).end());
    })

    .catch((error) => res.status(500).send(error).end());
});

//delete Module

router.delete('/admin/:id', function (req, res) {
  const id = new mongodb.ObjectID(req.params.id);
  const searchObject = { _id: id };
  client
    .db('admins')
    .collection('syllabus')
    .deleteOne(searchObject)
    .then((result) => res.status(200).send(result).end())
    .catch((error) => res.status(500).send(error).end());
});


const URI = process.env.DATABASE_URI;
const ObjectID = mongodb.ObjectID;
const client = new mongodb.MongoClient(URI, { useUnifiedTopology: true });
client.connect();
module.exports = router;
