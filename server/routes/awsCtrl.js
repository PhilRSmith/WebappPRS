var aws = require('aws-sdk'); 
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
const { check, validationResult} = require("express-validator");
var jwt = require("jsonwebtoken");
var SecretPayload=process.env.SecretPayload
var comicUploadSchema = require("../Schemas/comicUploadSchema");

/*var mongooseSetup = async () => {
  var adminLoginCredentials=process.env.DBAccess
  try {
    await mongoose.connect(adminLoginCredentials,  {
      useNewUrlParser: true,
      useUnifiedTopology : true 
    });
    console.log("DB Request made");
  } catch (e) {
    console.log(e);
    throw e;
  }
};*/

router.post('/', async function(req, res) {
  const S3_BUCKET = process.env.bucket
  
 
  var token = req.cookies.token
 
  //mongooseSetup()
  
  if (!token) {
    //mongoose.disconnect()
    return res.json('Authentication Error')
  }
    try {
      const decoded = jwt.verify(token, `${SecretPayload}`);
      var role = decoded.user.role;
      
      if(role == 'admin'){
        console.log('userRole: ' + role)
        const fileName = req.body.fileName
        const fileType = req.body.fileType
        console.log(fileName + fileType)

        var title = req.body.title
        var issue = req.body.issue
        var page = req.body.page

      if(title && issue && page){
        console.log(title + ':' + issue + ':' +page)
          aws.config.update({
            region: 'us-east-2', // Put your aws region here
            accessKeyId: process.env.AWSAccessKeyId,
            secretAccessKey: process.env.AWSSecretKey
          });
            const s3 = new aws.S3();  // Create a new instance of S3
            // Set up the payload of what we are sending to the S3 api
            const s3Params = {
              Bucket: S3_BUCKET,
              Key: fileName,
              Expires: 500,
              ContentType: fileType,
              ACL: 'public-read'
            };
            // Make a request to the S3 API to get a signed URL which we can use to upload our file
            s3.getSignedUrl('putObject', s3Params, (err, data) => {
              if (err) {
                console.log(err);
                //mongoose.disconnect()
                res.json({ success: false, error: err })
              }
              // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
              const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
              };
              // Send it all back
              res.json({ success: true, data: { returnData } });
            });
            var img_url = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
           
            comicpage = new comicUploadSchema({
              title,
              issue,
              page,
              img_url
            })
            await comicpage.save();
          }
          else{
            //mongoose.disconnect()
            console.log('INSUFFICIENT INFO')
            res.json('INSUFFICIENT INFO')
          }
          }
        else{
          //mongoose.disconnect()
          console.log('UNAUTHORIZED ACCESS')
          res.json('UNAUTHORIZED ACCESS')
        }
        //mongoose.connection.close()
    } catch (e) {
      console.error(e);
      //mongoose.disconnect()
      res.json('Authentication Error');
    }

})

router.get('/lol', (req,res) =>{
  res.json({"Greeting" : "Hello "});
});

module.exports = router;