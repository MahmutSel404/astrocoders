const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();


// create a  /attendance page which includes a form. Our form allow students to enter: Name, Email Address, Date
router.post('/', (req, res) => {
  const admindb = client.db('admins');

  admindb
    .collection('code')
    .findOne({ code: { $eq: req.body.code } })

    .then(function (result) {
      if (!result) {
        return Promise.reject(new Error('Invalid code'));
      }

      return result;
    })

    .then((result) => {
      const db = client.db('attendance');
      const collection = db.collection('students');
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      let time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

      const addAttendance = {
        name: req.body.name,
        email: req.body.email,
        date: date.toString(),
        time: time.toString(),
        // location: req.body.location,
        // type: req.body.type,
        code: req.body.code,
        notes: req.body.notes,

        class_code: {
          ...result,
          attendees: null,
        },
      };

      return admindb
        .collection('code')
        .findOneAndUpdate(
          { _id: { $eq: result._id } },
          { $push: { attendees: addAttendance } }
        )
        .then(() => collection.insertOne(addAttendance));
    })
    .then(function (result) {
      res.status(200).send(result.ops[0]).end();
    })
    .catch(function (err) {
      return res.status(500).send({ message: err.message }).end();
    });
});

const URI = process.env.DATABASE_URI;
const ObjectID = mongodb.ObjectID;
const client = new mongodb.MongoClient(URI, { useUnifiedTopology: true });
client.connect();
module.exports = router;
