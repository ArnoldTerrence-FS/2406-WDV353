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
            dataInput: region,
            data: newRegion,
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
    // Validators aren't working for some reason
    const {id} = req.params;
    const allRegions = await Regions.find({});
    console.log(allRegions);
    const idValidation = allRegions.map((e) => e._id.toString());
    try {
        if (idValidation.indexOf(id)!== -1) {
            const deleteRegion = await Regions.findByIdAndDelete(id);
            console.log("data >>>", deleteRegion);
            const newAllRegions = await Regions.find({});
            res.status(202).json({
                allRegionsData: newAllRegions,
                deletedData: deleteRegion,
                data: id,
                success:true, 
                message: `${req.method} method - ${deleteRegion.name} deleted`
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
            message:`delete failed: Id not found.`
        })
    }
};

const updateRegionById = async (req, res) => {
    // http://localhost:3000/pokedex/regions/id
    // Validations not working.
    const {id} = req.params;
    console.log(id);
    const update = req.body;
    console.log(update); 
    const allRegions = await Regions.find({});
    // const updateInfo = await Regions.findByIdAndUpdate(id, update)
    // // console.log(updateInfo)
    // try {
    //         const updateRegion = await Regions.findOneAndUpdate(req.params,update,{new: true});
    //         res.status(202).json({
    //             data: console.log(Regions),
    //             success:true,
    //             message: `${req.method} - region found.`
    //         });
    //     }
    // catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         success: false,
    //         message:`${req.method} failed`
    //     })
    // }

    //  Validations
    // Temporary Validation

    const idValidation = allRegions.map((e) => e._id.toString());

    console.log(Object.hasOwn(update, "name" || "year" || "description"));
    try {
        if (idValidation.indexOf(id)!== -1) {
            await Regions.findByIdAndUpdate(id, update);
            if(Object.hasOwn(update, "name")) {
                const nameValidator = typeof update.name;
                if (nameValidator === "string"){
                    await Regions.findByIdAndUpdate(id, update);
                    res.status(202).json({
                        data: [update, id],
                        success:true, 
                        message: `${req.method} - request to Region endpoint.`
                    });
                } 
                else {
                    res.status(406).json({
                        success: false, 
                        message: `${req.method} failed - please ender a valid name. Must be a string.`
                    });
                }
            }
            else if (Object.hasOwn(update, "year")) {
                const yearValidator = typeof update.year;
                if (yearValidator === "number"){
                    await Regions.findByIdAndUpdate(id, update);
                    res.status(202).json({
                        data: [update, id],
                        success:true, 
                        message: `${req.method} - request to Region endpoint.`
                    });
                } 
                else {
                    res.status(406).json({
                        success: false, 
                        message: `${req.method} failed - please enter a valid year. Must be a number.`
                    });
                }
            }
            else if (Object.hasOwn(update, "description")) {
                const descriptionValidator = typeof update.description;
                if (descriptionValidator === "string"){
                    await Regions.findByIdAndUpdate(id, update);
                    res.status(202).json({
                        data: [update, id],
                        success:true, 
                        message: `${req.method} - request to Region endpoint.`
                    });
                } 
                else {
                    res.status(406).json({
                        success: false, 
                        message: `${req.method} failed - please enter a valid description. Must be a string`
                    });
                }
            }
            else {
                res.status(406).json({
                    success: false, 
                    message: `${req.method} - failed, Object Property does not exist or is not found`
                });
            }
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
    createRegion,
    getAllRegions,
    getRegionById,
    updateRegionById,
    deleteRegionById,
};