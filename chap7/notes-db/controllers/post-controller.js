const Post = require('../models/Post');

exports.create = (req, res) => {
  if(!req.body.content) {
    console.log(req.body.content);

    return res.status(400).send({
      message: "Post's content cannot be empty"
    });
  }

  const post = new Post({
    title: req.body.title || "Untitle post",
    content: req.body.content
  });

  post.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
}
