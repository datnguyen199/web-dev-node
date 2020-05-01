var express = require('express');
var router = express.Router();
var dbConnection = require('../lib/mysql-database');

router.get('/books', (req, res, next) => {
  dbConnection.query('SELECT * FROM books ORDER BY id desc', (err, rows) => {
    if(err) {
      req.flash('error', err);
      res.render('books', {data: ''});
    } else {
      res.render('books', {data: rows});
    }
  })
});

router.post('/books', (req, res, next) => {
  let name = req.body.name;
  let author = req.body.author;
  let errors = false;

  if(name.length === 0 || author.length === 0) {
    req.flash('error', "Enter name and author");
    return res.render('books/add', {
      name: name,
      author: author
    })
  }

  let form_data = {
    name: name,
    author: author
  }

  dbConnection.query('INSERT INTO books SET ?', form_data, (err, result) => {
    if(err) {
      req.flash('error', err);
      res.render('books/add', {
        name: form_data.name,
        author: form_data.author
      })
    } else {
      req.flash('success', "Book added successfull!");
      res.redirect('/books');
    }
  })
});
