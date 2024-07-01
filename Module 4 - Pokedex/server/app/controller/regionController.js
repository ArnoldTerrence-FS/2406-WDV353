const Regions = require("../models/Region")

const getAllRegions = async (req, res) => {
    // http://localhost:3000/pokedex/regions

    // Comparison Query Operators - numericals /dates
    let querString = JSON.stringify(req.query);

    querString = querString.replace(/\b(gt|gte|lt|lte)\b/g,(match) => `$${match}`);

    console.log(JSON.parse(querString));
    // Comparison Query Operators
    
    let query = Regions.find(JSON.parse(querString)).sort({year: 'asc'});

    // Query select
    if (req.query.select) {
        const fields = req.query.select.split(",").join(" ");
        query = Regions.find({}).select(fields).sort({year: 'asc'});

        console.log('selected');
    }
    //Query Select

    //Query Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = Pokemon.find({}).sort(sortBy);

        console.log(`sorted`)
    }
    //Query Sort

    //Pagination
    if (querString.includes("page")){

        query = Regions.find({});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page - 1 ) * limit;

        query.skip(skip).limit(limit).sort(name = "asc");
    }
    //Pagination

    const region = await query;

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
            message: `${req.method} - Region Created`
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
            message:`delete failed: check error`
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
                message: `${req.method} method - region has been updated.`
            });
        } 
        else {
            res.status(406).json({
                success: false, 
                message: `${req.method} - failed, id does not exist or is not found`
            });
        }
    } catch(error) {
        if (error.name == "ValidationError") {
            console.error("Error Validation!", error);
            res.status(422).json(error)
        } else {
            console.log(error);
            res.status(500).json(error)
        }
    };
};

module.exports = {
    createRegion,
    getAllRegions,
    getRegionById,
    updateRegionById,
    deleteRegionById,
};