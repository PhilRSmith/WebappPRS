var express = require('express');
var router = express();
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
  const adminLoginCredentials=process.env.DBAccess
  MongoClient.connect(adminLoginCredentials, function (err, client) {
    if (err) throw err
    let drinks = [ 'water', 'beer'];
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
  const adminLoginCredentials=process.env.DBAccess
  MongoClient.connect(adminLoginCredentials, function (err, client) {
    if (err) throw err
    
  })
	res.json({ express: 'express backend linked to react' })
  });


router.get('/browse', (req, res) => {
  const adminLoginCredentials=process.env.DBAccess
  var comicArray = []
  MongoClient.connect(adminLoginCredentials, function (err, client) {
    if (err) throw err
    
    var db = client.db('418Admin')
    var dbPages = db.collection('comicpages')

    dbPages.find({page: '1'}).toArray((err, items)=>{
     if (err) throw err
      res.json(items)
    })
    
  })
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

/** 
router.get('/browse', (req, res) => {
  
  var comicArray = []
 
   comicArray = browseHelper()
    
  console.log(comicArray)
  res.json(comicArray)
  });

  async function browseHelper(){
    try{
    const adminLoginCredentials=process.env.DBAccess
    client = await MongoClient.connect(adminLoginCredentials, {useNewUrlParser : true} ) 
      var db = client.db('418Admin');
      var dbPages = db.collection('comicpages');
      let response = await dbPages.find({});
      return response.toArray(); 
    }
    catch(err) {console.error(err); }
    finally{client.close();}
  }
  */

