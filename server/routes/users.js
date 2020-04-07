var express = require('express');
var router = express();
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const { check, validationResult} = require("express-validator");
var mongoose = require("mongoose");
var User = require("../Schemas/userSchema");
var SecretPayload=process.env.SecretPayload
//var passport = require('./passport');
var auth = require("./authMiddleware/authorization")

var mongooseSetup = async () => {
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
};

router.get("/userRole", async (req, res) => {
  console.log(req.cookies.token)
  var token = req.cookies.token
  mongooseSetup()

  if (!token) return res.json('guest')
  try {
    const decoded = jwt.verify(token, `${SecretPayload}`);
    var userRole = decoded.user.role;
    console.log('userRole: ' + userRole)
    res.json(userRole)
    mongoose.disconnect()
  } catch (e) {
    console.error(e);
    res.json('guest');
    mongoose.disconnect()
    
  }
});

/* Verify that info aligns to that of a user, or admin */
router.post('/login', async (req, res) => {
  mongooseSetup()
  const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('this bitch empty, YEET')
      mongoose.disconnect()
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
        mongoose.disconnect()
        return res.status(400).json({
          message: "User Doesn't Exist"
        })
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch){
        console.log('Password Wrong')
        mongoose.disconnect()
        return res.status(400).json({
          message: "Incorrect Password !"
        })
      }

      const claims = {
        user: {
              role: user.userType,
              id: user.id
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
          mongoose.disconnect()
          res.cookie('token', token)
          res.status(200).json({
            token
          })
                    
        }
      );
    } catch (e) {
      console.error(e);
      mongoose.disconnect()
      res.status(500).json({
        message: "Server Error"
      });
    }
  
})

/**/ 
/* Verify that email not already used, and add new user */
router.post('/register',  async (req, res) => {
  mongooseSetup()
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        mongoose.disconnect()
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
            mongoose.disconnect()
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
          no
          
          
          const header = {
            alg: "HS512",
            typ: "JWT"
          }
          const claims = {
              user: {
                  role: user.userType,
                  id: user.id
              }
          };

          jwt.sign(
              claims,
              `${SecretPayload}`, {
                  expiresIn: 10000
              },
              (err, token) => {
                  if (err) throw err;
                  mongoose.disconnect()
                  res.cookie('token', token, { httpOnly: false })
                  res.status(200).json({
                    token
                  })
              }
          );
      } catch (err) {
        mongoose.disconnect()
          console.log(err.message);
          res.status(500).send("Error in Saving");
      }
  
})
 

module.exports = router;
