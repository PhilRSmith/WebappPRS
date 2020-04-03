var express = require('express');
var router = express();
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const { check, validationResult} = require("express-validator");
var mongooseSetup = require("../MongooseSetup/MongooseSetup")
var User = require("../Schemas/userSchema");
var session = require('express-session')
var SecretPayload=process.env.SecretPayload
//var passport = require('./passport');
var auth = require("./authMiddleware/authorization")

/*router.use(
  session({
  secret: `${SecretPayload}`, 
  resave: false, 
  saveUninitialized: false 
  })
)*/
//router.use(passport.initialize())
//router.use(passport.session())

router.get("/userRole", auth, async (req, res) => {
  try {
    mongooseSetup()
    //curSession=req.session
    //curSession.email;
    //if(curSession.email){
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(req.user.id);
      res.json(user.userType);
    //}
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

/* Verify that info aligns to that of a user, or admin */
router.post('/login', async (req, res) => {
  mongooseSetup()
  const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('this bitch empty, YEET')
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
        return res.status(400).json({
          message: "User Doesn't Exist"
        })
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch){
        console.log('Password Wrong')
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
          res.cookie('userToken', token)
          res.status(200).json({
            token
          })
                    
        }
      );
    } catch (e) {
      console.error(e);
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
          await user.save();
          
          
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
                  res.cookie('token', token, { httpOnly: false })
                  res.status(200).json({
                    token
                  })
              }
          );
      } catch (err) {
          console.log(err.message);
          res.status(500).send("Error in Saving");
      }
  
})
 

module.exports = router;
