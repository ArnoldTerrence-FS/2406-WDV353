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
    const {id} = req.params;
    console.log(id);
    const allRegions = await Regions.find({});
    const idValidation = allRegions.map((e) => e._id.toString());

    try{
        if (idValidation.indexOf(id)!== -1) {
            await Regions.findByIdAndUpdate(id, req.body,{runValidators:true});
            res.status(202).json({
                data: id,
                success:true, 
                message: `${req.method} method -`
            });
        } 
        else {
            res.status(406).json({
                success: false, 
                message: `${req.method} - failed, id does not exist or is not found`
            });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:`delete failed: Id not found.`
        })
    };
};

module.exports = {
    createRegion,
    getAllRegions,
    getRegionById,
    updateRegionById,
    deleteRegionById,
};