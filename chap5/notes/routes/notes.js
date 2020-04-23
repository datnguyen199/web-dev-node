'use strict';

var util = require('util');
var express = require('express');
var router = express.Router();
var notes = require('../models/notes-memory');

router.get('/add', (req, res, next) => {
  res.render('noteedit', {
    title: "Add a note",
    docreate: true,
    notekey: "",
    note: undefined
  });
});

router.post('/save', (req, res, next) => {
  var promise;
  if(req.body.docreate === "create") {
    promise = notes.create(req.body.notekey, req.body.title, req.body.body);
  } else {
    promise = notes.update(req.body.notekey, req.body.title, req.body.body);
  }
  promise.then(note => {
    res.redirect('/notes/view?key=' + req.body.notekey);
  })
  .catch(err => { next(err); });
})

router.get('/view', (req, res, next) => {
  notes.read(req.query.key)
  .then(note => {
    res.render('noteview', {
      title: note ? note.title : "",
      notekey: req.query.key,
      note: note
    })
  })
  .catch(err => { next(err); });
})

module.exports = router;
