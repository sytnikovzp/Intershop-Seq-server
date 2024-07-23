const { Router } = require('express');
// ============================
// const authorRouter = require('./authorRouters');
// const customerRouter = require('./customerRouters');
// const bookRouter = require('./bookRouters');
const brandRouter = require('./brandRouters');

const router = new Router();

router.use('/brands', brandRouter);
// router.use('/authors', authorRouter);
// router.use('/customers', customerRouter);
// router.use('/books', bookRouter);

module.exports = router;
