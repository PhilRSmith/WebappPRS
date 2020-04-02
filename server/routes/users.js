var express = require('express');
var router = express();
var cors = require('cors');
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const { check, validationResult} = require("express-validator");
var bodyParser = require("body-parser");
var mongooseSetup = require("../MongooseSetup/MongooseSetupUsers")
var User = require("../userLayout/userLayout");
router.use(cors());
var SecretPayload=process.env.SecretPayload


/* Verify that info aligns to that of a user, or admin */
router.post('/login', async (req, res) => {
  mongooseSetup()
  const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        `${SecretPayload}`,
        {
          expiresIn: 7200
        },
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token, { httpOnly: true })
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

          const payload = {
              user: {
                  id: user.id
              }
          };

          jwt.sign(
              payload,
              `${SecretPayload}`, {
                  expiresIn: 10000
              },
              (err, token) => {
                  if (err) throw err;
                  res.cookie('token', token, { httpOnly: true })
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
