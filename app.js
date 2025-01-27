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
app.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM Categories');
    const categories = result.rows;
    res.render('index',{categories});
});

app.post('/new-cat',async (req,res)=>{
    const {name} = req.body;
    await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *',[name]);
    res.redirect("/");
})

// SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});