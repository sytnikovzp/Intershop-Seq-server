const createError = require('http-errors');

const {
  IC,
  Sequelize: { Op },
} = require('../db/models');

class ICController {
  async getICs(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const records = await IC.findAll({
        attributes: ['id', 'title', 'description'],
        raw: true,
        limit,
        offset,
        order: [['id', 'ASC']],
      });

      if (records.length > 0) {
        console.log(`Result is: ${JSON.stringify(records, null, 2)}`);
        res.status(200).json(records);
      } else {
        next(createError(404, 'Item categories not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getAllRecordsAboveHalf(req, res, next) {
    try {
      const totalRecords = await IC.count();
      const halfCount = Math.floor(totalRecords / 2);
      const records = await IC.findAll({
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

  async getICsByNames(req, res, next) {
    try {
      const { icNames } = req.body;

      if (!Array.isArray(icNames) || icNames.length === 0) {
        return next(
          createError(400, 'Invalid or empty item category names array')
        );
      }

      const records = await IC.findAll({
        where: {
          title: {
            [Op.in]: icNames,
          },
        },
      });

      if (records.length > 0) {
        console.log(`Result is: ${JSON.stringify(records, null, 2)}`);
        res.status(200).json(records);
      } else {
        next(createError(404, 'No item categories found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteICsByTitles(req, res, next) {
    try {
      const { icNames } = req.body;

      if (!Array.isArray(icNames) || icNames.length === 0) {
        return next(
          createError(400, 'Invalid or empty item category names array')
        );
      }

      const delAmount = await IC.destroy({
        where: {
          title: {
            [Op.in]: icNames,
          },
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No item categories found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getICById(req, res, next) {
    try {
      const {
        params: { icId },
      } = req;

      const ic = await IC.findOne({
        where: { id: icId },
        attributes: ['id', 'title', 'description'],
        raw: true,
      });

      if (ic) {
        console.log(`Result is: ${JSON.stringify(ic, null, 2)}`);
        res.status(200).json(ic);
      } else {
        next(createError(404, 'Item category not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createIC(req, res, next) {
    try {
      const newIC = await IC.create(req.body);
      console.log(newIC.dataValues);
      res.status(201).json(newIC);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async updateIC(req, res, next) {
    try {
      const { id } = req.body;
      const ic = await IC.findOne({ where: { id } });

      if (ic) {
        await ic.update(req.body);
        console.log(`Result is: ${JSON.stringify(ic, null, 2)}`);
        res.status(201).json(ic);
      } else {
        next(createError(404, 'Item category not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteIC(req, res, next) {
    try {
      const {
        params: { icId },
      } = req;

      const ic = await IC.findOne({
        where: { id: icId },
        attributes: ['id'],
      });

      const delAmount = await IC.destroy({
        where: {
          id: icId,
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No item category found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}

module.exports = new ICController();
