var express = require('express');
var router = express.Router();
var math = require('../math');
router.get('/', function(req, res, next) {
  if(req.query.fibonum) {
    res.render('fibonacci', {
      title: "Calculate fibonacci number",
      fibonum: req.query.fibonum,
      fiboval: math.fibonacciLoop(req.query.fibonum)
    });
  } else {
    res.render('fibonacci', {
      title: "Calculate fibonacci number",
      fiboval: undefined
    })
  }
});

module.exports = router;
