const router = require("express").Router();

const { 
    createPokemon,
    getAllPokemon,
    getPokemonById,
    updatePokemonById,
    deletePokemonById, 
    getPokemonByTypes,
} = require("../controller/pokemonController");

router.get ("/", getAllPokemon);

router.get ("/:id", getPokemonById);

router.get("/type/:type", getPokemonByTypes);

router.post ("/", createPokemon);

router.put ("/:id", updatePokemonById);

router.delete ("/:id", deletePokemonById);

module.exports = router;