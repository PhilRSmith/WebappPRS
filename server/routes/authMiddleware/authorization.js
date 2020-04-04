var jwt = require('jsonwebtoken');
//var session = require('express-session')
var SecretPayload=process.env.SecretPayload
var bodyParser = require("body-parser");


var userSchema = require('../../Schemas/userSchema')
var jwt = require("jsonwebtoken");


module.exports = function(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, `${SecretPayload}`);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};