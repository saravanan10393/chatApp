var express = require('express');
var router = express.Router();
var db = require('../db/index');

/* GET home page. */
router.post('/register', function(req, res, next) {
    db.User.register(req.body,function(data){
      res.send(data);
    });
});

router.post('/login',function(req, res, next){
  db.User.login(req.body,function(data){
    res.send(data);
  });
});

router.get('/messages', (req, res) => {
  console.log('incoming query params ',req.query);
  db.Message.get(req.query.from, req.query.to, (messages) => res.send(messages));
});

module.exports = router;
