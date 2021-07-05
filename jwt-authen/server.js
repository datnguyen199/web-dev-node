const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

app.get('/posts', (req, res) => {
  res.json({"username": "test", title: "Post 1"} );
});

app.listen(3000);
