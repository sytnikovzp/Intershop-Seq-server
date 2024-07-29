const createError = require('http-errors');

const {
  Brand,
  Sequelize: { Op },
  sequelize,
} = require('../db/models');

class BrandController {
  async getBrands(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const records = await Brand.findAll({
        // attributes: ['id', 'title', 'description'],
        raw: true,
        limit,
        offset,
        order: [['id', 'ASC']],
      });

      if (records.length > 0) {
        console.log(`Result is: ${JSON.stringify(records, null, 2)}`);
        res.status(200).json(records);
      } else {
        next(createError(404, 'Brands not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getAllRecordsAboveHalf(req, res, next) {
    try {
      const totalRecords = await Brand.count();
      const halfCount = Math.floor(totalRecords / 2);
      const records = await Brand.findAll({
        where: {
          id: {
            [Op.gt]: halfCount,
          },
        },
        order: [['id', 'ASC']],
      });

      if (records.length > 0) {
        console.log(`Result is: ${JSON.stringify(records, null, 2)}`);
        res.status(200).json(records);
      } else {
        next(createError(404, 'No records found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getBrandsByNames(req, res, next) {
    try {
      const { brandNames } = req.body;

      if (!Array.isArray(brandNames) || brandNames.length === 0) {
        return next(createError(400, 'Invalid or empty brand names array'));
      }

      const records = await Brand.findAll({
        where: {
          title: {
            [Op.in]: brandNames,
          },
        },
      });

      if (records.length > 0) {
        console.log(`Result is: ${JSON.stringify(records, null, 2)}`);
        res.status(200).json(records);
      } else {
        next(createError(404, 'No brands found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteBrandsByTitles(req, res, next) {
    try {
      const { brandNames } = req.body;

      if (!Array.isArray(brandNames) || brandNames.length === 0) {
        return next(createError(400, 'Invalid or empty brand names array'));
      }

      const delAmount = await Brand.destroy({
        where: {
          title: {
            [Op.in]: brandNames,
          },
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No brands found to delete'));
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
        // attributes: ['id', 'title', 'description'],
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

      const delAmount = await Brand.destroy({
        where: {
          id: brandId,
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No brand found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async patchBrand(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { brandId },
        body,
      } = req;

      const [count, [updatedBrands]] = await Brand.update(body, {
        where: {
          id: brandId,
        },
        returning: ['id', 'title', 'description', 'image'],
        raw: true,
        transaction: t,
      });
      console.log(count);
      console.log(updatedBrands);

      if (count > 0) {
        console.log(`Result is: ${JSON.stringify(updatedBrands, null, 2)}`);
        res.status(200).json(updatedBrands);
      } else {
        console.log('Brand not found');
        next(createError(404, 'Brand not found'));
      }

      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async changeLogo(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        file: { filename },
        params: { brandId },
      } = req;

      const [count, [updatedBrands]] = await Brand.update(
        {
          logo: filename,
        },
        {
          where: {
            id: brandId,
          },
          returning: true,
          raw: true,
          fields: ['logo'],
          transaction: t,
        }
      );
      console.log(count);
      console.log(updatedBrands);

      if (count > 0) {
        console.log(`Result is: ${JSON.stringify(updatedBrands, null, 2)}`);
        res.status(200).json(updatedBrands);
      } else {
        console.log('Brand not found');
        next(createError(404, 'Brand not found'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new BrandController();
