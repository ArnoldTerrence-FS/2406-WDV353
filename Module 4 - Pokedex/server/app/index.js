const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const app = express();
const routerHandler = require("./routes");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// http://localhost:3000/
app.get("/", (req, res) => {
    console.log("API-Success")
    res.status(200).json({
        success: true , 
        message:`${req.method} - Request made`})
});

// http://localhost:3000/pokedex
app.use("/pokedex", routerHandler);

module.exports = app ;
