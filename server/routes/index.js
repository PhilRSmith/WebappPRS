var express = require('express');
var router = express();
var portDev = process.env.port || 9000
var portPub = process.env.port || 8080
var cors = require('cors');

router.use(cors());
/* GET home page. */

router.listen(portDev, () => console.log(`Listening on port ${portDev}`));

router.get('/', (req, res, next) => {
	res.render( 'index' , {title: 'Express' })
	});


router.get('/profile', (req, res) => {
	res.json({ express: 'express backend linked to react' })
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
