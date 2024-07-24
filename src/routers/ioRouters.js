const { Router } = require('express');
// ============================
const IOController = require('../controllers/ioController');
const { validateIO } = require('../middleware/validate.mw');
const { paginate } = require('../middleware');
// ============================

const router = new Router();

router
  .route('/')
  // .get(paginate.paginateElements, IOController.getIOs)
  // .post(validateIO, IOController.createIO)
  // .put(validateIO, IOController.updateIO);

router.route('/count-brand').get(IOController.getBrandModelCounts);

// router.route('/by-names').post(IOController.getIOsByNames);

// router.route('/del-ios').delete(IOController.deleteIOsByTitles);

module.exports = router;
