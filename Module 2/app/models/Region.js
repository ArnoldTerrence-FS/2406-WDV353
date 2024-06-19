const mongoose = require("mongoose");

const regionSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "You are required to have a name"],
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: [20, "region name is too long"],
    },
    year: {
        // Will probably use a regex in the future. possible between 1900 - 2040
        type: Number,
        required: true,
        min: 1995,
        max: 2026,
    },
    description: {
        type: String,
        required: [true, "Please add a description of the region"],
        maxlength: [500, "Description cannot be more than 500 characters"],
    }
},
{ 
    timestamps: true
},
);

module.exports = mongoose.model('Region', regionSchema);