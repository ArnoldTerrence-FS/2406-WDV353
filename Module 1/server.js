const http = require('http');
require("dotenv").config();
const app = require("./app/")

const server = http.createServer(app); 

// Edits: 
const PORT = process.env.port || 3000;

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
});