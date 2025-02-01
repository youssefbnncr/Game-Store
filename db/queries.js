const pool = require('./pool');

async function addCategory(newName) {
  await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [newName]);
}

async function getCategories() {
  const result = await pool.query('SELECT * FROM categories');
  return result.rows;
}

async function editCategory(newName, oldName) {
  await pool.query('UPDATE categories SET name = ($1) WHERE name = ($2)', [newName, oldName]);
}

async function deleteCategory(categoryID) {
  await pool.query('DELETE FROM categories WHERE id = ($1)', [categoryID]);
}

async function getItems(categoryID) {
  const result = await pool.query(
    'SELECT items.id, items.name, items.description, items.year, items.quantity FROM items INNER JOIN categories ON items.category_id = categories.id WHERE categories.id = $1',
    [categoryID]
  );
  return result.rows;
}

async function insertItems(name, description, year, quantity, category_id) {
  await pool.query(
    'INSERT INTO items (name, description, year, quantity, category_id) VALUES ($1, $2, $3, $4, $5)',
    [name, description, year, quantity, category_id]
  );
}

async function deleteItem(itemId) {
  await pool.query('DELETE FROM items WHERE id = $1', [itemId]);
}


module.exports = {
  addCategory,
  getCategories,
  deleteCategory,
  editCategory,
  getItems,
  insertItems,
  deleteItem
};
