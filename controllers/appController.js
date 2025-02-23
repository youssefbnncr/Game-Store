const db = require('../db/queries');

async function renderIndex(req, res) {
  const categories = await db.getCategories();
  const id = req.params.id || null;
  let items = [];

  if (id) {
    items = await db.getItems(id);
  }

  res.render('index', { categories, items, id });
}

async function deleteName(req, res) {
  await db.deleteCategory(req.params.id);
  res.redirect('/');
}

async function insertName(req, res) {
  const name = req.body.name;
  await db.addCategory(name);
  res.redirect('/');
}

async function modifyName(req, res) {
  const { oldName, newName } = req.query;
  await db.editCategory(newName, oldName);
  res.redirect('/');
}

async function insertItem(req, res) {
  const { name, description, year, quantity, category_id } = req.body;

  if (!category_id) {
    return res.status(400).send('Category ID is required');
  }
  await db.insertItems(name, description, year, quantity, category_id);
  res.redirect(`/${category_id}`);
}

async function deleteItem(req, res) {
  const itemId = parseInt(req.params.id, 10);
  if (!isNaN(itemId)) {
    await db.deleteItem(itemId);
  }
  res.redirect('back');
}

async function modifyItem(req, res) {
  const itemId = parseInt(req.params.id, 10);
  const { name, description, year, quantity } = req.body;

  if (!isNaN(itemId)) {
    await db.updateItem(itemId, name, description, year, quantity);
  }
  res.redirect('back');
}


module.exports = {
  renderIndex,
  deleteName,
  insertName,
  modifyName,
  insertItem,
  deleteItem,
  modifyItem
};
