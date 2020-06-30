'use strict';

const express = require('express');
const path = require('path');
const log = require('debug')('notes:router-users');
const error = require('debug')('notes-error');
const router = express.Router();

exports.router = router;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usersModel = require(process.env.USERS_MODEL ? path.join('..', process.env.USERS_MODEL) : '../models/users-rest');

exports.initPassport = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());
}

exports.ensureAuthenticated = function(req, res, next) {
  if(req.user) next();
  else res.redirect('users/login');
}

module.exports = router;
