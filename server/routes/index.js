var express = require('express');
//var axios= require('axios').default;
var router = express.Router();

/* GET home page. */
  router.get('/', function(req, res, next) {
  res.render('index', { title: 'PRSapp' });
});


//note, unlike POST, parameters are visible to a user in browser address bar in GET request.
router.get('/add/:firstNumber/and/:secondNumber', (req,res)=>{
  console.log(req.params.firstNumber + req.params.secondNumber);
  //Checkout console to see why parseInt is essential in this case.
  let firstNo = parseInt(req.params.firstNumber),
      secondNo = parseInt(req.params.secondNumber);
  res.json({"Addition" : firstNo + secondNo});
});

module.exports = router;
