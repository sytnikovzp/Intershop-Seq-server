const { Router } = require('express');
// ============================
const brandRouter = require('./brandRouters');
const imRouter = require('./imRouters');
const icRouter = require('./icRouters');
const itRouter = require('./itRouters');

const router = new Router();

router.use('/brands', brandRouter);
router.use('/item_models', imRouter);
router.use('/item_categories', icRouter);
router.use('/item_types', itRouter);

module.exports = router;
