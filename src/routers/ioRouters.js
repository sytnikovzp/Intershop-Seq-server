const { Router } = require('express');
// ============================
const IOController = require('../controllers/ioController');
// const { validateIO } = require('../middleware/validate.mw');
// ============================

const router = new Router();

router.route('/count-brand').get(IOController.getBrandModelCounts);
router.route('/items-on-stores').get(IOController.getStoreItemTypeCounts);
router.route('/top-customer').get(IOController.getTopCustomer);
router.route('/exp-purchase').get(IOController.getExpensivePurchase);

module.exports = router;
