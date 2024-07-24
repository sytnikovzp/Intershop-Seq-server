const { Router } = require('express');
// ============================
const ITController = require('../controllers/itController');
const { validateIT } = require('../middleware/validate.mw');
const { paginate } = require('../middleware');
// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, ITController.getITs)
  .post(validateIT, ITController.createIT)
  .put(validateIT, ITController.updateIT);

router.route('/half').get(ITController.getAllRecordsAboveHalf);

router.route('/by-names').post(ITController.getITsByNames);

router.route('/del-its').delete(ITController.deleteITsByTitles);

router
  .route('/:itId')
  .get(ITController.getITById)
  .delete(ITController.deleteIT);

module.exports = router;
