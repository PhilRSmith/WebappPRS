var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/hello', (req,res)=>{
  res.json({"Greeting" : "Hello " + req.body.name});
});

module.exports = router;
