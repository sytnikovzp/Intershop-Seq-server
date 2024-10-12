const { Router } = require('express');
// ============================
const {
  getCustomers,
  createCustomer,
  updateCustomer,
  getAllRecordsAboveHalf,
  getCustomersByNames,
  deleteCustomersByTitles,
  getCustomerById,
  deleteCustomer,
} = require('../controllers/customerController');
const {
  paginate: { paginateElements },
  validate: { validateCustomer },
  hash: { hashPassword },
} = require('../middleware');
// ============================

const router = new Router();

router
  .route('/')
  .get(paginateElements, getCustomers)
  .post(validateCustomer, hashPassword, createCustomer)
  .put(validateCustomer, updateCustomer);

router.route('/half').get(getAllRecordsAboveHalf);

router.route('/by-names').post(getCustomersByNames);

router.route('/del-customers').delete(deleteCustomersByTitles);

router.route('/:customerId').get(getCustomerById).delete(deleteCustomer);

module.exports = router;
