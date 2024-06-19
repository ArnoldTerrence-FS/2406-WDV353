const Regions = require("../models/Region")

const getAllRegions = async (req, res) => {
    // http://localhost:3000/pokedex/regions
    const region = await Regions.find({});
    try {
        res.status(200).json({
            data: region,
            success:true,
            message: `${req.method} - Request to Region endpoint`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:`${req.method} failed`
        })
    }
};

const getRegionById = async (req, res) => {
    // http://localhost:3000/pokedex/regions/id
    const {id} = req.params;
    try {
        const region = await Regions.findById(id);
        if (region === null){
            res.status(404).json({
                success: false, 
                message: `Region Id not found. Please find the correct Id`
            });
        } else {
            console.log("data >>>", region);
            res.status(202).json({
                data: region,
                success:true,
                message: `${req.method} - region found.`
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

const createRegion = async (req, res) => {
    // http://localhost:3000/pokedex/regions
    const {region} = req.body;
    try {
        const newRegion = await Regions.create(region);
        console.log("region entered", newRegion);
        res.status(201).json({
            success:true, 
            message: `${req.method} - request to Region endpoint`
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

const deleteRegionById = async (req, res) => {
    // http://localhost:3000/pokedex/regions/id
    const {id} = req.params;
    try {
        const deleteRegion = await Regions.findByIdAndDelete(id);
        console.log("data >>>", deleteRegion);
        res.status(202).json({
            success:true, 
            message: `${req.method} - ${deleteRegion.name} deleted`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:`delete failed: Id not found.`
        })
    }
};

const updateRegionById = async (req, res) => {
    // http://localhost:3000/pokedex/regions/id
    const {id} = req.params;
    console.log(id);
    const update = req.body;
    console.log(update); 
    try {
        await Regions.findByIdAndUpdate(id, update, {new:true});
        res.status(202).json({
            data: [update, id],
            success:true, 
            message: `${req.method} - request to Region endpoint.`
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
    createRegion,
    getAllRegions,
    getRegionById,
    updateRegionById,
    deleteRegionById,
};