
// const express = require('express');
// const mongoose = require('./config');
// const playerRoutes = require('../BACK/routes/playerRoutes');

// const app = express();
// app.use(express.json());
// app.use('/players', playerRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const mongoose = require("./config");
const cors = require("cors");
const playerRoutes = require("./routes/playerRoutes");

const app = express();

// Enable CORS for all origins
app.use(cors());

// Allow JSON request body
app.use(express.json());

// Routes
app.use("/players", playerRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
