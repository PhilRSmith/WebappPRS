var mongoose = require("mongoose");
var express = require('express');

//code sourced from: https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i
const userLayout = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, { collection: 'users'});

// export model user with UserSchema
module.exports = mongoose.model("userLayout", userLayout);