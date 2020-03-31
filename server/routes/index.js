var express = require('express');
var router = express();
var MongoClient = require('mongodb').MongoClient

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


//Loading get request to grab comic page from DB
router.get('/Read/:issue', (req,res)=>{ 
  const adminLoginCredentials=process.env.DBAccess
 
  let inputIssue = req.params.issue
  MongoClient.connect(adminLoginCredentials, function (err, client) {
      if (err) throw err
      
      var db = client.db('418Admin')
      var dbPages = db.collection('comicpages')
  
      dbPages.find({issue: inputIssue}).toArray((err, items)=>{
       if (err) throw err
        res.json(items)
      })
  });
})

module.exports = router;

