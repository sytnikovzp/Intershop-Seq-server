const { Router } = require('express');
// ============================
const brandRouter = require('./brandRouters');
const imRouter = require('./imRouters');
const icRouter = require('./icRouters');
const itRouter = require('./itRouters');
const storeRouter = require('./storeRouters');
const customerRouter = require('./customerRouters');

const router = new Router();

router.use('/brands', brandRouter);
router.use('/item_models', imRouter);
router.use('/item_categories', icRouter);
router.use('/item_types', itRouter);
router.use('/stores', storeRouter);
router.use('/customers', customerRouter);

module.exports = router;
