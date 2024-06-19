const router = require("express").Router();

const { 
    createPokemon,
    getAllPokemon,
    getPokemonById,
    updatePokemonById,
    deletePokemonById, 
} = require("../controller/pokemonController");

router.get ("/", getAllPokemon);

router.get ("/:id", getPokemonById);

router.post ("/", createPokemon);

router.put ("/:id", updatePokemonById);

router.delete ("/:id", deletePokemonById);

module.exports = router;