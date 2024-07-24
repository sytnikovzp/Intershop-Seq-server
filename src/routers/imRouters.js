const { Router } = require('express');
// ============================
const IMController = require('../controllers/imController');
const { validateIM } = require('../middleware/validate.mw');
const { paginate } = require('../middleware');
// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, IMController.getIMs)
  .post(validateIM, IMController.createIM)
  .put(validateIM, IMController.updateIM);

router.route('/half').get(IMController.getAllRecordsAboveHalf);

router.route('/by-names').post(IMController.getIMsByNames);

router.route('/del-ims').delete(IMController.deleteIMsByTitles);

router
  .route('/:imId')
  .get(IMController.getIMById)
  .delete(IMController.deleteIM);

module.exports = router;
