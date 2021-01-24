const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

router.get('/', function (req, res) {
  client
    .db('admins')
    .collection('location')
    .find({})
    .toArray()
    .then((locations) => res.status(200).send(locations))
    .catch((error) => res.status(500).send(error).end());
});

router.post('/', function (req, res) {
  client
    .db('admins')
    .collection('location')
    .insertOne({
      name: req.body.name,
      groups: [],
    })
    .then((result) => res.status(200).send(result.ops[0]).end());
});

router.delete('/:id', function (req, res) {
  const id = new mongodb.ObjectID(req.params.id);
  const searchObject = { _id: id };
  client
    .db('admins')
    .collection('location')
    .deleteOne(searchObject)
    .then((location) => res.status(200).send(location).end())
    .catch((error) => res.status(500).send(error).end());
});

router.get('/:id', function (req, res) {
  // id = {id: mongodb.ObjectID(req.params.id)};
  // var id = new ObjectID(req.params.id);

  const id = new mongodb.ObjectID(req.params.id);
  const searchObject = { _id: id };
  client
    .db('admins')
    .collection('location')
    .findOne(searchObject)
    .then((location) => res.status(200).send(location).end())
    .catch((error) => res.status(500).send(error).end());
});

router.delete('/:id/group/:groupId', function (req, res) {
  const id = new mongodb.ObjectID(req.params.id);
  const groupId = new mongodb.ObjectID(req.params.groupId);

  console.log('location, group', id, groupId);

  const searchObject = { _id: id };
  client
    .db('admins')
    .collection('location')
    .findOne(searchObject)
    .then((location) => {
      const newGroups = location.groups.filter(
        (group) => !group._id.equals(groupId)
      );
      //location.groups.splice(index, 1);

      //console.log(location);

      client
        .db('admins')
        .collection('location')
        .updateOne(searchObject, { $set: { groups: newGroups } })
        .then((result) => res.status(200).send(result).end())
        .catch((error) => res.status(500).send(error).end());
    })

    .catch((error) => res.status(500).send(error).end());
});

router.delete('/:id', function (req, res) {
  const id = new mongodb.ObjectID(req.params.id);
  const searchObject = { _id: id };
  client
    .db('admins')
    .collection('location')
    // .deleteOne(searchObject)

    // .then((result) => res.status(200).send(result).end())
    // .catch((error) => res.status(500).send(error).end());

    .deleteOne(searchObject, function (error, result) {
      if (error) {
        res.status(500).send(error);
      } else if (result.deletedCount) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    });
});

router.post('/:id/group', function (req, res) {
  var group = { _id: new ObjectID(), name: req.body.name };

  client
    .db('admins')
    .collection('location')
    .findOneAndUpdate(
      // search operation
      { _id: { $eq: new ObjectID(req.params.id) } },

      // update operation
      { $push: { groups: group } }
    )
    .then((result) => res.status(200).send(group).end())
    .catch((error) => res.status(500).send(error).end());
});

const URI = process.env.DATABASE_URI;
const ObjectID = mongodb.ObjectID;
const client = new mongodb.MongoClient(URI, { useUnifiedTopology: true });
client.connect();
module.exports = router;
