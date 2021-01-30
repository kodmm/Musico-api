var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  res.json([{
    id: 1, 
    username: "sample01"
  }, {
    id: 2, username: "itawoan"
  }])
  
});

module.exports = router;
