const createError = require('http-errors');

const { Brand, sequelize } = require('../db/models');
const { raw } = require('express');

class BrandController {
  async getBrands(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const brands = await Brand.findAll({
        attributes: ['id', 'title', 'description'],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });
      if (brands.length > 0) {
        console.log(`Result is: ${JSON.stringify(brands, null, 2)}`);
        res.status(200).json(brands);
      } else {
        next(createError(404, 'Brands not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getBrandById(req, res, next) {
    try {
      const {
        params: { brandId },
      } = req;

      const brand = await Brand.findOne({
        where: { id: brandId },
        attributes: ['id', 'title', 'description'],
        raw: true,
      });

      if (brand) {
        console.log(`Result is: ${JSON.stringify(brand, null, 2)}`);
        res.status(200).json(brand);
      } else {
        next(createError(404, 'Brand not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createBrand(req, res, next) {
    try {
      const newBrand = await Brand.create(req.body);

      console.log(newBrand.dataValues);
      res.status(201).json(newBrand);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async updateBrand(req, res, next) {
    try {
      const { id } = req.body;
      const brand = await Brand.findOne({ where: { id } });

      if (brand) {
        await brand.update(req.body);

        console.log(`Result is: ${JSON.stringify(brand, null, 2)}`);
        res.status(201).json(brand);
      } else {
        next(createError(404, 'Brand not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteBrand(req, res, next) {
    try {
      const {
        params: { brandId },
      } = req;

      const brand = await Brand.findOne({
        where: { id: brandId },
        attributes: ['id'],
      });

      if (!brand) {
        next(createError(404, 'Brand not found'));
      }

      const delAmount = await Brand.destroy({
        where: {
          id: brandId,
        },
      });

      console.log(`Number of deleting rows: ${delAmount}`);
      res.status(204).json(brand);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}

module.exports = new BrandController();
