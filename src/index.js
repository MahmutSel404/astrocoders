const express = require('express');
const mongodb = require('mongodb');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors');
dotenv.config();

const URI = process.env.DATABASE_URI;
const client = new mongodb.MongoClient(URI, { useUnifiedTopology: true });
const PORT = process.env.PORT || 9000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Define routes---------------------------------------------------------------------------------------------------------
app.use('/login/create-user', require('./routes/auth'));
app.use('/admin/users', require('./routes/userProfiles'));
app.use('/admins', require('./routes/classCode'));
app.use('/attendance', require('./routes/attendClass'));
app.use('/studentsView/history', require('./routes/attendanceHistory'));
app.use('/syllabus', require('./routes/syllabus'));
app.use('/location', require('./routes/location'));
app.use('/attendance/student', require('./routes/attendeeList'));



client
  .connect()
  .then(() =>
    app.listen(PORT, () => console.log(`server started on port ${PORT}`))
  );
