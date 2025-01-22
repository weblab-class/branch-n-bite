const mongoose = require("mongoose");

const FoodgroupSchema = new mongoose.Schema({
    foodName: String,
    foodGroups: [String],
});

// compile model from schema
module.exports = mongoose.models.Foodgroup || mongoose.model("foodgroup", FoodgroupSchema);