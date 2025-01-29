const pool = require('./pool');

async function insertName(name) {
  await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *',[name]);
}

async function getName() {
  const result = await pool.query('SELECT * FROM Categories');
  const categories = result.rows;
  return categories;
}

async function deleteName(id){
  await pool.query('DELETE FROM categories WHERE id = ($1)',[id]);
}

module.exports = {
  insertName,
  getName,
  deleteName
}