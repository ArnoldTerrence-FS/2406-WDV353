const express = require("express");
const router = express.Router();

// http://localhost:3000/api

const pokedex = [{id: "1" ,pokemon: "bulbasaur", type: "grass"}, {id: "2", pokemon: "charmander", type: "fire"}, {id: "3", pokemon: "charizard", type: "fire"}];

// Checks the status of get
router.get("/", (req, res) => {
    console.log("status = success");
    res.status(200).json({
        message: "Routes are good!",
        pokedex,
        metadata: {
            hostname: req.hostname, 
            method: req.method,
        }
    })
});

// Get by id: pokemon by id, name or types
router.get("/:pokemonId", (req, res) => {
    console.log("get id = success");
    const pokemonId = req.params.pokemonId;
    let pokemon = 0
    if (pokemonId === "fire" || pokemonId === "grass" || pokemonId === "water") {
        pokemon = pokedex.filter( (pokemon) => pokemon.type === pokemonId);
    }else {
        pokemon = pokedex.find( (pokemons) => pokemons.pokemon === pokemonId || pokemons.id === pokemonId)
    };
    console.log(pokemon, pokemonId);
    res.status(200).json({
        message: "Get - success",
        pokemon,
        metadata: {
            hostname: req.hostname, 
            method: req.method,
        }
    })
});

// post pokemon
router.post("/", (req, res) => {
    console.log("post = success");
    const pokemon = {id: req.body.id, pokemon: req.body.pokemon , type: req.body.type};
    pokedex.push(pokemon)
    res.status(200).json({
        message: "Post - success",
        pokedex,
        metadata: {
            hostname: req.hostname, 
            method: req.method,
        }
    })
});

// delete by pokemon id
router.delete("/:pokemonId", (req, res) => {
    console.log("delete id = success");
    const {pokemonId} = req.params;
    const pokemonIndex = pokedex.findIndex( (pokemons) => pokemons.id === pokemonId);
    pokedex.splice(pokemonIndex, 1)
    res.status(200).json({
        message: "delete - success",
        metadata: {
            hostname: req.hostname, 
            pokedex,
            method: req.method,
        }
    })
});

// patch by id / name
router.patch("/:pokemonId", (req, res) => {
    console.log("patch = success");
    const {pokemonId} = req.params;
    const pokemonIndex = pokedex.findIndex( (pokemons) => pokemons.id === pokemonId);
    pokedex[pokemonIndex].pokemon = (req.body.pokemon === undefined) ? pokedex[pokemonIndex].pokemon : req.body.pokemon;
    pokedex[pokemonIndex].type = (req.body.type === undefined) ? pokedex[pokemonIndex].type : req.body.type ;
    res.status(200).json({
        message: "patch - success",
        pokedex,
        metadata: {
            hostname: req.hostname, 
            method: req.method,
        }
    })
});

module.exports = router ;
