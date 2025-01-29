const db = require('../db/queries');

async function renderIndex(req,res) {
  const categories = await db.getName();
  res.render('index',{categories});
}

async function deleteName(req,res) {
  await db.deleteName(req.params.id);
  res.redirect('/');
}

async function insertName(req,res) {
  const name = req.body.name;
  await db.insertName(name);
  res.redirect('/');
}

async function modifyName(req,res) {
  const {oldName , newName} = req.query;
  await db.modifyName(newName, oldName);
  res.redirect('/')
}

module.exports = {
  renderIndex,
  deleteName,
  insertName,
  modifyName
}