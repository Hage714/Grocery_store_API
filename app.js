const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 5000;
const app = express();   //initialise express variable

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

// Database Configuration
const { connect_database } = require("./db/connect");
connect_database();

// Route Imports
const itemRoutes = require("./routes/item");
const transactionRoutes = require("./routes/transaction");

// base route
app.get("/", (req, res) => {
    res.send({"message": "Server is running"}).status(200);
});

//items routes
app.use("/items",itemRoutes);
app.use("/transactions",transactionRoutes);

// start the server
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})