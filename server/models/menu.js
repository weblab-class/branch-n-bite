const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
    date: String,
    dorm: String,
    meal: String,
    menu: [{
        foodName: String,
        restrictions: [String],
        allergies: [String],
    }]
});

// compile model from schema
module.exports = mongoose.models.Menu || mongoose.model("menu", MenuSchema);
