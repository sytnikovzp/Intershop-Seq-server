const { Router } = require('express');
// ============================
const orderController = require('../controllers/orderController');
const { validateOrder } = require('../middleware/validate.mw');
const { paginate } = require('../middleware');
// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, orderController.getOrders)
  .post(validateOrder, orderController.createOrder)
  .put(validateOrder, orderController.updateOrder);

router.route('/half').get(orderController.getAllRecordsAboveHalf);

router.route('/by-names').post(orderController.getOrdersByNames);

router.route('/del-orders').delete(orderController.deleteOrdersByTitles);

router
  .route('/:orderId')
  .get(orderController.getOrderById)
  .delete(orderController.deleteOrder);

module.exports = router;
