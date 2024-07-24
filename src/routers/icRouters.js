const { Router } = require('express');
// ============================
const ICController = require('../controllers/icController');
const { validateIC } = require('../middleware/validate.mw');
const { paginate } = require('../middleware');
// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, ICController.getICs)
  .post(validateIC, ICController.createIC)
  .put(validateIC, ICController.updateIC);

router.route('/half').get(ICController.getAllRecordsAboveHalf);

router.route('/by-names').post(ICController.getICsByNames);

router.route('/del-ics').delete(ICController.deleteICsByTitles);

router
  .route('/:icId')
  .get(ICController.getICById)
  .delete(ICController.deleteIC);

module.exports = router;
