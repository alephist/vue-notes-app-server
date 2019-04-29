const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const notes = require('./routes/note');
const app = express();

mongoose
  .connect(config.mongoUri, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('Connected to database...'))
  .catch((err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use('/notes', notes);

app.listen(config.port, () => {
  console.log(`Listening to port ${config.port}...`);
});
