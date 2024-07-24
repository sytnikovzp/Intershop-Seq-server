const createError = require('http-errors');

const {
  IT,
  Sequelize: { Op },
} = require('../db/models');

class ITController {
  async getITs(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const records = await IT.findAll({
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
        next(createError(404, 'Item types not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getAllRecordsAboveHalf(req, res, next) {
    try {
      const totalRecords = await IT.count();
      const halfCount = Math.floor(totalRecords / 2);
      const records = await IT.findAll({
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

  async getITsByNames(req, res, next) {
    try {
      const { itNames } = req.body;

      if (!Array.isArray(itNames) || itNames.length === 0) {
        return next(
          createError(400, 'Invalid or empty item type names array')
        );
      }

      const records = await IT.findAll({
        where: {
          title: {
            [Op.in]: itNames,
          },
        },
      });

      if (records.length > 0) {
        console.log(`Result is: ${JSON.stringify(records, null, 2)}`);
        res.status(200).json(records);
      } else {
        next(createError(404, 'No item types found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteITsByTitles(req, res, next) {
    try {
      const { itNames } = req.body;

      if (!Array.isArray(itNames) || itNames.length === 0) {
        return next(
          createError(400, 'Invalid or empty item type names array')
        );
      }

      const delAmount = await IT.destroy({
        where: {
          title: {
            [Op.in]: itNames,
          },
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No item types found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getITById(req, res, next) {
    try {
      const {
        params: { itId },
      } = req;

      const it = await IT.findOne({
        where: { id: itId },
        attributes: ['id', 'title', 'description'],
        raw: true,
      });

      if (it) {
        console.log(`Result is: ${JSON.stringify(it, null, 2)}`);
        res.status(200).json(it);
      } else {
        next(createError(404, 'Item type not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createIT(req, res, next) {
    try {
      const newIT = await IT.create(req.body);
      console.log(newIT.dataValues);
      res.status(201).json(newIT);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async updateIT(req, res, next) {
    try {
      const { id } = req.body;
      const it = await IT.findOne({ where: { id } });

      if (it) {
        await it.update(req.body);
        console.log(`Result is: ${JSON.stringify(it, null, 2)}`);
        res.status(201).json(it);
      } else {
        next(createError(404, 'Item type not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteIT(req, res, next) {
    try {
      const {
        params: { itId },
      } = req;

      const it = await IT.findOne({
        where: { id: itId },
        attributes: ['id'],
      });

      const delAmount = await IT.destroy({
        where: {
          id: itId,
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No item type found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}

module.exports = new ITController();
