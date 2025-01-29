const {Router} = require('express');
const appRouter = Router();

const appController = require('../controllers/appController');

appRouter.get('/',appController.renderIndex);
appRouter.post('/add',appController.insertName);
appRouter.post('/:id',appController.deleteName);

module.exports = appRouter;