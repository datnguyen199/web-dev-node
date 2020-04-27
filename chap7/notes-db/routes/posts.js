'use strict';

module.exports = (app) => {
  const postController = require('../controllers/post-controller.js');

  app.post('/posts', postController.create);

  // app.get('/notes', postController.findAll);
}
