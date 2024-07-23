const { Router } = require('express');
// ============================
const brandController = require('../controllers/brandController');
const { validateBrand } = require('../middleware/validate.mw'); 
const { paginate } = require('../middleware');
// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, brandController.getBrands)
  .post(validateBrand, brandController.createBrand)
  .put(validateBrand, brandController.updateBrand);

router
  .route('/:brandId')
  .get(brandController.getBrandById)
  .delete(brandController.deleteBrand);

module.exports = router;
