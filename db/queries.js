const pool = require('./pool');

async function addCategory(newName) {
  await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *',[newName]);
}

async function getCategories() {
  const result = await pool.query('SELECT * FROM categories');
  return result.rows;
}

async function editCategory(newName, oldName) {
  await pool.query('UPDATE categories SET name = ($1) WHERE name = ($2)',[newName, oldName]);
}

async function deleteCategory(categoryID){
  await pool.query('DELETE FROM categories WHERE id = ($1)',[categoryID]);
}

module.exports = {
  addCategory,
  getCategories,
  deleteCategory,
  editCategory
}