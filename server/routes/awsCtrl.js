var aws = require('aws-sdk'); 
var express = require('express');
var router = express.Router();
const { check, validationResult} = require("express-validator");
var jwt = require("jsonwebtoken");
var SecretPayload=process.env.SecretPayload
var comicUploadSchema = require("../Schemas/comicUploadSchema");
var userSchema = require("../Schemas/userSchema")

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

/*post to upload a new photo in place of the logged in users current profile image
Plan to have this remove the old photo from S3, and update user info in db to new img url
alternatively, may simply have user put in their own url for the img*/
router.post('/profile_img', async function(req, res) {
  const S3_BUCKET = process.env.userbucket
  var token = req.cookies.token
  if (!token) {
    
    return res.json('Authentication Error')
  }
    try {
      const decoded = jwt.verify(token, `${SecretPayload}`);
      const { email, role } = decoded.user
      let user = await User.findOne({
      email
      });

      var query = {'email' : user.email}
      
      if((role == 'user') || (role =='admin')){
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


module.exports = router;