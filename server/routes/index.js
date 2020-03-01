var express = require('express');
//var axios= require('axios').default;
var router = express();
var portDev = process.env.port || 9000
var portPub = process.env.port || 8080

/* GET home page. */

router.listen(portDev, () => console.log(`Listening on port ${portDev}`));

router.get('/express', (req, res) => {
	res.send({ express: 'express backend linked to react' })
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
