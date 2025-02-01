const { Router } = require('express');
const appRouter = Router();
const appController = require('../controllers/appController');

appRouter.post('/add', appController.insertName);
appRouter.get('/changeCategoryName', appController.modifyName);
appRouter.post('/delete/:id', appController.deleteName);
appRouter.post('/addItem', appController.insertItem);
appRouter.get('/:id(\\d+)?', appController.renderIndex);  // Fix the favi problem

module.exports = appRouter;
