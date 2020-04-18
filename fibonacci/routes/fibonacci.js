var express = require('express');
var router = express.Router();
var math = require('../math');
router.get('/', function(req, res, next) {
  if(req.query.fibonum) {
    math.fibonacciAsync(req.query.fibonum, (err, fiboval) => {
      res.render('fibonacci', {
        title: "Calculate fibonacci number",
        fibonum: req.query.fibonum,
        fiboval: fiboval
      });
    });
  } else {
    res.render('fibonacci', {
      title: "Calculate fibonacci number",
      fiboval: undefined
    })
  }
});

module.exports = router;
