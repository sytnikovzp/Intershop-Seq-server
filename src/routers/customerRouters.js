const { Router } = require('express');
// ============================
const customerController = require('../controllers/customerController');
const { validateCustomer } = require('../middleware/validate.mw');
const { paginate } = require('../middleware');
// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, customerController.getCustomers)
  .post(validateCustomer, customerController.createCustomer)
  .put(validateCustomer, customerController.updateCustomer);

router.route('/half').get(customerController.getAllRecordsAboveHalf);

router.route('/by-names').post(customerController.getCustomersByNames);

router.route('/del-customers').delete(customerController.deleteCustomersByTitles);

router
  .route('/:customerId')
  .get(customerController.getCustomerById)
  .delete(customerController.deleteCustomer);

module.exports = router;
