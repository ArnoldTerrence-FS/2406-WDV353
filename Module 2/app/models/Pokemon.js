const mongoose = require("mongoose");

// example pokemon = [{name: "bulbasaur", type: "Grass", description: "A seed pokemon used to sprout????" region:"Kanto"}

const pokemonSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "You are required to have a name"],
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: [50, "pokemon name is too long"],
    },
    type: {
        type: [String],
        required: true,
        enum: [
            "Normal",
            "Fighting",
            "Flying",
            "Poison",
            "Ground",
            "Rock",
            "Bug",
            "Ghost",
            "Steel",
            "Fire",
            "Water",
            "Grass",
            "Electric",
            "Psychic",
            "Ice",
            "Dragon",
            "Dark",
            "Fairy",
        ],
    },
    description: {
        type: String,
        required: [true, "Please add a description that talks about the pokemon"],
        trim: true,
        minlength: [5, "description needs to be more than 1 word"],
        maxlength: [500, "Description cannot be more than 500 characters"]
    },
    region: {
        type: mongoose.ObjectId,
        required: [true, "You are required to have a region of origin"],
        ref: "Region",
    },
},
{ 
    timestamps: true
},
);

module.exports = mongoose.model('Pokemon', pokemonSchema);