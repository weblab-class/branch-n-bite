const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  googleid: String,
  foodName: String,
  foodGroups: [String],
});

// compile model from schema
module.exports = mongoose.model("report", ReportSchema);
