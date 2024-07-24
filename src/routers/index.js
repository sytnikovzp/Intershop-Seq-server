const { Router } = require('express');
// ============================
const brandRouter = require('./brandRouters');
const imRouter = require('./imRouters');
const customerRouter = require('./customerRouters');
const storeRouter = require('./storeRouters');
const itRouter = require('./itRouters');
const icRouter = require('./icRouters');
const orderRouter = require('./orderRouters');

const router = new Router();

router.use('/brands', brandRouter);
router.use('/item_models', imRouter);
router.use('/customers', customerRouter);
router.use('/stores', storeRouter);
router.use('/item_types', itRouter);
router.use('/item_categories', icRouter);
router.use('/orders', orderRouter);

module.exports = router;
