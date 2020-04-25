var mongoose = require("mongoose");

//basic format code sourced from: https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i
const comicUploadSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  issue: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
  img_url: {
    type: String,
    required: true
  }

}, { collection: 'comicpages'});

// export model user with UserSchema
module.exports = mongoose.model("comicUploadSchema", comicUploadSchema);