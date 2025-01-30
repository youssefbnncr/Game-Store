const db = require('../db/queries');

async function renderIndex(req,res) {
  const categories = await db.getCategories();
  const id = req.params.id || null;
  const items = await db.getItems(id);
  res.render('index',{categories,items});
}

async function deleteName(req,res) {
  await db.deleteCategory(req.params.id);
  res.redirect('/');
}

async function insertName(req,res) {
  const name = req.body.name;
  await db.addCategory(name);
  res.redirect('/');
}

async function modifyName(req,res) {
  const {oldName , newName} = req.query;
  await db.editCategory(newName, oldName);
  res.redirect('/')
}



module.exports = {
  renderIndex,
  deleteName,
  insertName,
  modifyName
}