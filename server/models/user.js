const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  picture: String,
  bio: String,
  restrictions: [String],
  allergies: [String],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
