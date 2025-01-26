const express = require('express');
const app = express();

// DB
const pool = require('./db/pool');

const path = require("node:path");
const { render } = require('ejs');

// HTML
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// CSS
const assetsPath = path.join(__dirname, "src");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get('/', (req, res) => {
    res.render('index');
});

// SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});