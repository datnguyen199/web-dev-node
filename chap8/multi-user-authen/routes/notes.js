'use strict';

var util = require('util');
var express = require('express');
var router = express.Router();
// var notes = require('../models/notes-memory');
var notes = require('../models/notes-mongodb');
const usersRouter = require('./users');

router.get('/add', usersRouter.ensureAuthenticated, (req, res, next) => {
  res.render('noteedit', {
    title: "Add a note",
    docreate: true,
    notekey: "",
    note: undefined,
    user: req.user ? req.user : undefined,
    breadcrumbs: [
      { href: '/', text: 'Home' },
      { active: true, text: "Add Note" }
    ],
    hideAddNote: true
  });
});

router.post('/save', usersRouter.ensureAuthenticated, (req, res, next) => {
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
      note: note,
      user: req.user ? req.user : undefined
    })
  })
  .catch(err => { next(err); });
})

router.get('/edit', usersRouter.ensureAuthenticated, (req, res, next) => {
  notes.read(req.query.key)
  .then(note => {
    res.render('noteedit', {
      title: note ? ("Edit " + note.title) : "Add a note",
      docreate: false,
      notekey: req.query.key,
      note: note,
      user: req.user ? req.user : undefined
    });
  });
})

router.get('/destroy', usersRouter.ensureAuthenticated, (req, res, next) => {
  notes.read(req.query.key)
  .then(note => {
    res.render('notedestroy', {
      title: note ? note.title : "",
      notekey: req.query.key,
      note: note,
      user: req.user ? req.user : undefined
    });
  })
  .catch(err => { next(err); });
})

router.post('/destroy/confirm', usersRouter.ensureAuthenticated, (req, res, next) => {
  console.log(req.body.notekey);
  notes.destroy(req.body.notekey)
  .then(() => { res.redirect('/'); })
  .catch(err => { next(err); });
});

module.exports = router;
