const { Router } = require('express');
// ============================
const storeController = require('../controllers/storeController');
const { validateStore } = require('../middleware/validate.mw');
const { paginate } = require('../middleware');
// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, storeController.getStores)
  .post(validateStore, storeController.createStore)
  .put(validateStore, storeController.updateStore);

router.route('/half').get(storeController.getAllRecordsAboveHalf);

router.route('/by-names').post(storeController.getStoresByNames);

router.route('/del-stores').delete(storeController.deleteStoresByTitles);

router
  .route('/:storeId')
  .get(storeController.getStoreById)
  .delete(storeController.deleteStore);

module.exports = router;
