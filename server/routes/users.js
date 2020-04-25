var express = require('express');
var router = express();
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const { check, validationResult} = require("express-validator");
//var mongoose = require("mongoose");
var User = require("../Schemas/userSchema");
var SecretPayload=process.env.SecretPayload
//var passport = require('./passport');
var auth = require("./authMiddleware/authorization")

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

/* Load user profile info */
router.get('/profile', async (req, res) => {
  var token = req.cookies.token
  if(!token) return res.json('guest')
  try{
    console.log('grabbing profile')
    const decoded = jwt.verify(token, `${SecretPayload}`);
    const { email } = decoded.user
    let user = await User.findOne({
      email
    });

    var profileDetails = []
    for(var i = 0; i<3; i++){
      if(i==0){
        profileDetails.push(user.username)
      }
      if(i==1){
        profileDetails.push(user.profile_img)
      }
      if(i==2){
        profileDetails.push(user.profile_desc)
      }
    }
    res.json(profileDetails)
    res.status(200)

  } catch (e) {
    console.error(e);
    res.status(400)
  }
  
  });

router.get("/userRole", async (req, res) => {
  console.log(req.cookies.token)
  var token = req.cookies.token
  //mongooseSetup()

  if (!token) return res.json('guest')
  try {
    const decoded = jwt.verify(token, `${SecretPayload}`);
    const userRole = decoded.user.role;
    console.log('userRole: ' + userRole)
    //mongoose.disconnect()
    res.json(userRole)
    
  } catch (e) {
    console.error(e);
    //mongoose.disconnect()
    res.json('guest'); 
  }
  //mongoose.disconnect()
});

/* Verify that info aligns to that of a user, or admin */
router.post('/login', async (req, res) => {
  //mongooseSetup()
  const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('this &17$@ empty, YEET')
      //mongoose.disconnect()
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user){
        console.log('not a valid user')
        //mongoose.disconnect()
        return res.status(400).json({
          message: "User Doesn't Exist"
        })
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch){
        console.log('Password Wrong')
        //mongoose.disconnect()
        return res.status(400).json({
          message: "Incorrect Password !"
        })
      }

      const claims = {
        user: {
              role: user.userType,
              id: user.id,
              email: user.email
          }
      };

      jwt.sign(
        claims,
        `${SecretPayload}`,
        {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          //mongoose.disconnect()
          res.cookie('token', token)
          res.status(200).json({
            token
          })
                    
        }
      );
    } catch (e) {
      console.error(e);
      //mongoose.disconnect()
      res.status(500).json({
        message: "Server Error"
      });
    }
  
})

/**/ 
/* Verify that email not already used, and add new user */
router.post('/register',  async (req, res) => {
  //mongooseSetup()
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //mongoose.disconnect()
          return res.status(400).json({
              errors: errors.array()
          });
      }
      const {
          
          username,
          email,
          password
      
      } = req.body;
      
      try {
          let user = await User.findOne({
              email
          });
          if (user) {
            //mongoose.disconnect()
              return res.status(400).json({
                  msg: "User Already Exists"
              });
          }

          user = new User({
              username,
              email,
              password
          });

          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
          
          
          
          const header = {
            alg: "HS512",
            typ: "JWT"
          }
          const claims = {
              user: {
                  role: user.userType,
                  id: user.id,
                  email: user.email
              }
          };

          user.save()
          jwt.sign(
              claims,
              `${SecretPayload}`, {
                  expiresIn: 10000
              },
              (err, token) => {
                  if (err) throw err;
                  //mongoose.disconnect()
                  res.cookie('token', token, { httpOnly: false })
                  console.log('successful user creation')
                  res.status(200).json({
                    token
                  })
              }
          );
      } catch (err) {
        //mongoose.disconnect()
          console.log(err.message);
          res.status(500).send("Error in Saving");
      }
  
})

router.get('/logout', (req, res) => {
  res.cookie('token', {path :'/'}, {expire: Date.now() })
  res.status(200)
  console.log('logged out')
})
 

module.exports = router;
