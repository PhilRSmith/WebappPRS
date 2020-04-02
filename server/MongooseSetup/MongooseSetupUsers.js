var express = require('express');
var mongoose = require("mongoose");

var MongooseSetupUsers = async () => {
    var adminLoginCredentials=process.env.DBAccess
  try {
    await mongoose.connect(adminLoginCredentials,  {
      useNewUrlParser: true,
      useUnifiedTopology : true 
    });
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = MongooseSetupUsers;
