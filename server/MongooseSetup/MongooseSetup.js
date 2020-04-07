var mongoose = require("mongoose");

var MongooseSetup = async () => {
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

module.exports = MongooseSetup;
