const Pokemon = require("../models/Pokemon");
const Regions = require("../models/Region")

const getAllPokemon = async (req, res) => {
    // http://localhost:3000/pokedex/pokemon
    try {
    const pokemon = await Pokemon.find({});
    res.status(200).json({
        data: pokemon,
        success:true,
        message: `${req.method} - Request to Pokemon endpoint`
    });
    } catch (error){
        console.log(error);
        res.status(500).json({
            success: false,
            message:`${req.method} failed`
        })
    }
};

const getPokemonById = async (req, res) => {
    // http://localhost:3000/pokedex/pokemon/id
    const {id} = req.params;
    try {
        const pokemon = await Pokemon.findById(id);
        if (pokemon === null){
            res.status(404).json({
                success: false, 
                message: `Pokemon Id not found. Please find the correct Id`
            });
        } else {
            console.log("data >>>", pokemon);
            res.status(202).json({
                data: pokemon,
                success: true,
                message: `${req.method} - pokemon found.`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:`${req.method} failed`
        })
    }
};

const createPokemon = async (req, res) => {
    // http://localhost:3000/pokedex/pokemon 
    // example pokemon = [{name: "bulbasaur", type: "Grass", description: "A seed pokemon used to sprout????" region:"Kanto"}]
    const {pokemon} = req.body;
    try {
        const newPokemon = await Pokemon.create(pokemon);
        await Regions.findByIdAndUpdate({_id: pokemon.region}, {$push: {pokemon: newPokemon._id} },{runValidators:true});
        console.log("pokemon entered", newPokemon);
        res.status(201).json({
            dataInput: pokemon,
            data: newPokemon,
            success:true, 
            message: `${req.method} - Pokemon Created`
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
    const allPokemon = await Pokemon.find({});
    console.log(allPokemon);
    const idValidation = allPokemon.map((e) => e._id.toString());
    try {
        if (idValidation.indexOf(id)!== -1) {
        const deletePokemon = await Pokemon.findByIdAndDelete(id);
        await Regions.findByIdAndUpdate({_id: deletePokemon.region}, {$pull: {pokemon: deletePokemon._id} },{runValidators:true});
        console.log("data >>>", deletePokemon);
        res.status(202).json({
            success:true, 
            message: `${req.method} - ${deletePokemon.name} deleted`
        });
        } 
        else {
            res.status(406).json({
                success: false, 
                message: `${req.method} - failed, id does not exist or is not found`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:`delete failed: check error`
        })
    }
};

const updatePokemonById = async (req, res) => {
    // http://localhost:3000/pokedex/pokemon/id
    const {id} = req.params;
    console.log(id);
    const allPokemon = await Pokemon.find({});
    console.log(allPokemon);
    const idValidation = allPokemon.map((e) => e._id.toString());

    try {
        if (idValidation.indexOf(id)!== -1) {
            await Pokemon.findByIdAndUpdate(id, req.body,{runValidators:true});
            res.status(202).json({
                data: id,
                success:true,
                message: `${req.method} method - pokemon has been updated.`
            });
        } 
        else {
            res.status(406).json({
                success: false, 
                message: `${req.method} - failed, id does not exist or is not found`
            });
        }
    } catch (error) {
        if (error.name == "ValidationError") {
            console.error("Error Validation!", error);
            res.status(422).json(error)
        } else {
            console.log(error);
            res.status(500).json(error)
        }
    }
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
