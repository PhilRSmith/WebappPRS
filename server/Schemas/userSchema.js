var mongoose = require("mongoose");

//basic format code sourced from: https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i
const userSchema = mongoose.Schema({
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
  profile_img: {
    type: String,
    default: 'https://webcomicpages.s3.us-east-2.amazonaws.com/stock_profile_img.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, { collection: 'users'});

// export model user with UserSchema
module.exports = mongoose.model("userSchema", userSchema);