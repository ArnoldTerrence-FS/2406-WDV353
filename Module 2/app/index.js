const express = require("express");
const morgan = require("morgan")
const app = express();
const routerHandler = require("./routes");

app.use(express.json());
app.use(morgan("dev"));

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
