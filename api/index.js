// const express = require("express");
require('dotenv').config();
const server = require('./app/server');

// const server = express();
// const PORT = 5000;
const port = process.env.PORT;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
