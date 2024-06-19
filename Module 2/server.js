require("dotenv").config();
const app = require("./app/");
const connectDB = require("./app/db/config");

connectDB();

// Edits:
const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});