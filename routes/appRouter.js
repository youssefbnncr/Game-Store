const {Router} = require('express');
const appRouter = Router();

const appController = require('../controllers/appController');

appRouter.post('/add',appController.insertName);
appRouter.get('/changeCategoryName',appController.modifyName);
appRouter.post('/:id',appController.deleteName);
appRouter.get('/(:id)?',appController.renderIndex);


module.exports = appRouter;