const pool = require('./pool');

async function insertName(name) {
  await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *',[name]);
}

async function getName() {
  const result = await pool.query('SELECT * FROM categories');
  const categories = result.rows;
  return categories;
}

async function modifyName(newName, oldName) {
  await pool.query('UPDATE categories SET name = ($1) WHERE name = ($2)',[newName, oldName]);
}

async function deleteName(id){
  await pool.query('DELETE FROM categories WHERE id = ($1)',[id]);
}

module.exports = {
  insertName,
  getName,
  deleteName,
  modifyName
}