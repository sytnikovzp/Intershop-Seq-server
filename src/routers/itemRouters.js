const { Router } = require('express');
// ============================
const itemController = require('../controllers/itemController');
const { validateItem } = require('../middleware/validate.mw');
const { paginate } = require('../middleware');
// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, itemController.getItems)
  .post(validateItem, itemController.createItem)
  .put(validateItem, itemController.updateItem);

router.route('/half').get(itemController.getAllRecordsAboveHalf);

router.route('/by-names').post(itemController.getItemsByNames);

router.route('/del-items').delete(itemController.deleteItemsByTitles);

router
  .route('/:itemId')
  .get(itemController.getItemById)
  .delete(itemController.deleteItem);

module.exports = router;
