const { Router } = require('express');
// ============================
const brandController = require('../controllers/brandController');
const { validateBrand } = require('../middleware/validate.mw');
const { paginate, upload } = require('../middleware');
// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, brandController.getBrands)
  .post(validateBrand, brandController.createBrand)
  .put(validateBrand, brandController.updateBrand);

router.route('/half').get(brandController.getAllRecordsAboveHalf);

router.route('/by-names').post(brandController.getBrandsByNames);

router.route('/del-brands').delete(brandController.deleteBrandsByTitles);

router
  .route('/:brandId')
  .get(brandController.getBrandById)
  .delete(brandController.deleteBrand)
  .patch(validateBrand, brandController.patchBrand);

router
  .route('/:brandId/logos')
  .patch(upload.uploadImages.single('brandLogo'), brandController.changeLogo);

module.exports = router;
