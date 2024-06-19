const express = require("express");
const router = express.Router();
const pokemonRoutes = require("./pokemonRoutes");
const regionRoutes = require("./regionRoutes");

// http://localhost:3000/pokedex

router.get("/",(req,res) => {
    console.log("Request-Success")
    res.status(200).json({
        success: true , 
        message:`${req.method} - Request made`})
});

// http://localhost:3000/pokedex/pokemon

router.use("/pokemon", pokemonRoutes);

// http://localhost:3000/pokedex/regions

router.use("/regions", regionRoutes);

module.exports = router;