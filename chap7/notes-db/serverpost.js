const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dbConfig = require('./config/database-post-mongo');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Connect to database successfull!');
}).catch(err => {
  console.log('Could not connect database' + err);
  process.exit();
})

app.get('/', (req, res) => {
  res.json({ "status": 200, "message": "ok" });
});

require('./routes/posts')(app);

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
