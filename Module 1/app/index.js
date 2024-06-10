const express = require("express");
const app = express();
const router = require("./routes");

app.use(express.json());

// http://localhost:3000/
app.get("/", (req, res) => {
    console.log("Get - Success")
    res.status(200).json({
        message: "Server is running!",
        metadata: {
            hostname: req.hostname, 
            method: req.method,
        }
    })
});

app.use("/pokedex", router);

module.exports = app ;
