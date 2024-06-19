const Pokemon = require("../models/Pokemon");

const getAllPokemon = async (req, res) => {
    // http://localhost:3000/pokedex/pokemon
    const pokemon = await Pokemon.find({});
    res.status(200).json({
        data: pokemon,
        success:true,
        message: `${req.method} - Request to Pokemon endpoint`
    });
};

const getPokemonById = async (req, res) => {
    // http://localhost:3000/pokedex/pokemon/id
    const {id} = req.params;
    try {
        const pokemon = await Pokemon.findById(id);
        if (pokemon === null){
            console.log("data >>>", pokemon);
            res.status(500).json({
                success: false, 
                message: `Pokemon Id not found. Please find the correct Id`
            });
        } else {
            console.log("data >>>", pokemon);
            res.status(200).json({
                data: pokemon,
                success:true,
                message: `${req.method} - pokemon found.`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:`get failed: something is wrong with Id`
        })
    }
};

const createPokemon = async (req, res) => {
    // http://localhost:3000/pokedex/pokemon 
    // example pokemon = [{name: "bulbasaur", type: "Grass", description: "A seed pokemon used to sprout????" region:"Kanto"}]
    const {pokemon} = req.body;
    try {
        const newPokemon = await Pokemon.create(pokemon);
        console.log("pokemon entered", newPokemon);
        res.status(200).json({
            success:true, 
            message: `${req.method} - request to Pokemon endpoint`
        });
    } catch (error) {
        if (error.name == "ValidationError") {
            console.error("Error Validation!", error);
            res.status(422).json(error)
        } else {
            console.log(error);
            res.status(500).json(error)
        }
    }
}

const deletePokemonById = async (req, res) => {
    // http://localhost:3000/pokedex/pokemon/id
    const {id} = req.params;
    try {
        const deletePokemon = await Pokemon.findByIdAndDelete(id);
        console.log("data >>>", deletePokemon);
        res.status(200).json({
            success:true, 
            message: `${req.method} - request to Pokemon endpoint. ${deletePokemon.name} is now gone`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:`delete failed: Id not found.`
        })
    }
};

const updatePokemonById = (req, res) => {
    // http://localhost:3000/pokedex/pokemon/id
    const {id} = req.params;
    res.status(200).json({
        id,
        success:true,
        message: `${req.method} - request to Author endpoint`
    });
};

// patch by id / name
// router.patch("/:pokemonId", (req, res) => {
//     console.log("patch = success");

//     const {pokemonId} = req.params;
//     const pokemonIdInt = parseInt(pokemonId);
//     const pokemonIndex = pokedex.findIndex( (pokemons) => pokemons.id === pokemonIdInt);

//     console.log(pokemonIndex);


//     //Edit:
//     const update = { ...pokedex[pokemonIndex], ...req.body};
//     pokedex[pokemonIndex] = update;

    
//     // pokedex[pokemonIndex].pokemon = (req.body.pokemon === undefined) ? pokedex[pokemonIndex].pokemon : req.body.pokemon;
//     // pokedex[pokemonIndex].type = (req.body.type === undefined) ? pokedex[pokemonIndex].type : req.body.type;

//     res.status(200).json({
//         message: "patch - success",
//         pokedex,
//         metadata: {
//             hostname: req.hostname, 
//             method: req.method,
//         }
//     })
// });

module.exports = {
    createPokemon,
    getAllPokemon,
    getPokemonById,
    updatePokemonById,
    deletePokemonById,
};
