var express = require('express');
var router = express();
var MongoClient = require('mongodb').MongoClient
var cors = require('cors');
router.use(cors());

router.get('/', (req, res, next) => {
	res.render( 'index' , {title: 'Express' })
  });


/* Load user profile info */
router.get('/profile', (req, res) => {
  const adminLoginCredentials=process.env.DBAccess
  MongoClient.connect(adminLoginCredentials, {
                      useNewUrlParser: true,
                      useUnifiedTopology : true 
                      } , function (err, client) {
                      if (err) throw err
    
                      })
	res.json({ express: 'express backend linked to react' })
  });

/* load all issues of comics (front page of each) */
router.get('/browse', (req, res) => {
  const adminLoginCredentials=process.env.DBAccess
  MongoClient.connect(adminLoginCredentials, {
                      useNewUrlParser: true,
                      useUnifiedTopology : true 
                      } , function (err, client) {
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
  MongoClient.connect(adminLoginCredentials, {
                      useNewUrlParser: true,
                      useUnifiedTopology : true 
                      } ,function (err, client) {
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
