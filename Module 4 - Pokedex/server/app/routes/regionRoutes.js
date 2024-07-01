const router = require("express").Router();

const { 
    createRegion,
    getAllRegions,
    getRegionById,
    updateRegionById,
    deleteRegionById, 
} = require("../controller/regionController");

router.get ("/", getAllRegions);

router.get ("/:id", getRegionById);

router.post ("/", createRegion);

router.put ("/:id", updateRegionById);

router.delete ("/:id", deleteRegionById);

module.exports = router;