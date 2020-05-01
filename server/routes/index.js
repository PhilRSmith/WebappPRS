var express = require('express');
var router = express();
var MongoClient = require('mongodb').MongoClient

router.get('/', (req, res, next) => {
	res.render( 'index' , {title: 'Express' })
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

    dbPages.find({page: 1}).toArray((err, items)=>{
     if (err) throw err
      res.json(items)
      client.close()
      //console.log('closed connection')
    })
    
  })
  });

  router.get('/homecards', (req, res) => {
    const adminLoginCredentials=process.env.DBAccess
    MongoClient.connect(adminLoginCredentials, {
                        useNewUrlParser: true,
                        useUnifiedTopology : true 
                        } , function (err, client) {
                        if (err) throw err
      
      var db = client.db('418Admin')
      var dbPages = db.collection('comicpages')
  
      dbPages.find().sort({issue: -1}).limit(1).toArray((err, items)=>{
       if (err) throw err
        res.json(items)
        client.close()
        //console.log('closed connection')
      })
      
    })
    });


//Loading get request to grab comic page from DB
router.get('/Read/:issue', (req,res)=>{ 
  const adminLoginCredentials=process.env.DBAccess
 
  let inputIssue = parseInt(req.params.issue)
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
        client.close()
        //console.log('closed connection')
      })
  });
})

module.exports = router;
