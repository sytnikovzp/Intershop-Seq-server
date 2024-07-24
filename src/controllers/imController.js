const createError = require('http-errors');

const {
  IM,
  Brand,
  Sequelize: { Op },
} = require('../db/models');
const { raw } = require('express');

class IMController {
  async getIMs(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const records = await IM.findAll({
        attributes: ['id', 'title', 'description'],
        include: [
          {
            model: Brand,
            attributes: ['title'],
          },
        ],
        raw: true,
        limit,
        offset,
        order: [['id', 'ASC']],
      });

      if (records.length > 0) {
        console.log(`Result is: ${JSON.stringify(records, null, 2)}`);
        res.status(200).json(records);
      } else {
        next(createError(404, 'Item models not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getAllRecordsAboveHalf(req, res, next) {
    try {
      const totalRecords = await IM.count();
      const halfCount = Math.floor(totalRecords / 2);
      const records = await IM.findAll({
        attributes: ['id', 'title', 'description'],
        include: [
          {
            model: Brand,
            attributes: ['title'],
          },
        ],
        where: {
          id: {
            [Op.gt]: halfCount,
          },
        },
        raw: true,
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

  async getIMsByNames(req, res, next) {
    try {
      const { imNames } = req.body;

      if (!Array.isArray(imNames) || imNames.length === 0) {
        return next(
          createError(400, 'Invalid or empty item model names array')
        );
      }

      const records = await IM.findAll({
        attributes: ['id', 'title', 'description'],
        include: [
          {
            model: Brand,
            attributes: ['title'],
          },
        ],
        where: {
          title: {
            [Op.in]: imNames,
          },
        },
        raw: true,
        order: [['id', 'ASC']],
      });

      if (records.length > 0) {
        console.log(`Result is: ${JSON.stringify(records, null, 2)}`);
        res.status(200).json(records);
      } else {
        next(createError(404, 'No item models found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteIMsByTitles(req, res, next) {
    try {
      const { imNames } = req.body;

      if (!Array.isArray(imNames) || imNames.length === 0) {
        return next(
          createError(400, 'Invalid or empty item model names array')
        );
      }

      const delAmount = await IM.destroy({
        where: {
          title: {
            [Op.in]: imNames,
          },
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No item models found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getIMById(req, res, next) {
    try {
      const {
        params: { imId },
      } = req;

      const im = await IM.findOne({
        where: { id: imId },
        attributes: ['id', 'title', 'description'],
        include: [
          {
            model: Brand,
            attributes: ['title'],
          },
        ],
        raw: true,
      });

      if (im) {
        console.log(`Result is: ${JSON.stringify(im, null, 2)}`);
        res.status(200).json(im);
      } else {
        next(createError(404, 'Item model not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createIM(req, res, next) {
    try {
      const { title, description, brandTitle } = req.body;

      const brand = await Brand.findOne({ where: { title: brandTitle } });

      if (!brand) {
        return next(createError(404, 'Brand not found!'));
      }

      const newIM = await IM.create({
        title,
        description,
        brand_id: brand.id,
      });

      console.log(newIM.dataValues);
      res.status(201).json(newIM);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async updateIM(req, res, next) {
    try {
      const { id, brandTitle, ...updateData } = req.body;
      const brand = await Brand.findOne({ where: { title: brandTitle } });

      if (!brand) {
        return next(createError(404, 'Brand not found!'));
      }

      const im = await IM.findOne({ where: { id } });

      if (im) {
        await im.update({
          ...updateData,
          brand_id: brand.id,
        });
        console.log(`Result is: ${JSON.stringify(im, null, 2)}`);
        res.status(201).json(im);
      } else {
        next(createError(404, 'Item model not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteIM(req, res, next) {
    try {
      const {
        params: { imId },
      } = req;

      const im = await IM.findOne({
        where: { id: imId },
        attributes: ['id'],
      });

      const delAmount = await IM.destroy({
        where: {
          id: imId,
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No item model found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}

module.exports = new IMController();
