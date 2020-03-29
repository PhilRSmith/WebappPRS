var express = require('express');
var router = express();
var adminLoginCredentials = 'mongodb+srv://PRSmith:Ocelot2893!@418term-ham3w.mongodb.net/test?retryWrites=true&w=majority'
var MongoClient = require('mongodb').MongoClient
var portDev = process.env.port || 9000
var portPub = process.env.port || 8080
var cors = require('cors');

router.use(cors());
/* GET home page. */


router.get('/', (req, res, next) => {
	res.render( 'index' , {title: 'Express' })
  });
  
  /* Example code */
router.get('/login', (req, res, next) => {
  MongoClient.connect(adminLoginCredentials, function (err, client) {
    if (err) throw err
    let drinks = [ 'water'];
    var db =client.db('drinks')
    drinks.forEach((item) => {
      console.log(item);
      db.collection('drinks').insert({name: item});
    });

      db.collection('drinks').find().toArray((err, result) => {
        if (err) throw err
        console.log(result);
      });
    
    })
})

router.get('/profile', (req, res) => {
  MongoClient.connect(adminLoginCredentials, function (err, client) {
    if (err) throw err
    console.log(client)
  })
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
