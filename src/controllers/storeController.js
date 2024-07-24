const createError = require('http-errors');

const {
  Store,
  Sequelize: { Op },
} = require('../db/models');

class StoreController {
  async getStores(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const records = await Store.findAll({
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
        next(createError(404, 'Stores not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getAllRecordsAboveHalf(req, res, next) {
    try {
      const totalRecords = await Store.count();
      const halfCount = Math.floor(totalRecords / 2);
      const records = await Store.findAll({
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

  async getStoresByNames(req, res, next) {
    try {
      const { storeNames } = req.body;

      if (!Array.isArray(storeNames) || storeNames.length === 0) {
        return next(createError(400, 'Invalid or empty store names array'));
      }

      const records = await Store.findAll({
        where: {
          title: {
            [Op.in]: storeNames,
          },
        },
      });

      if (records.length > 0) {
        console.log(`Result is: ${JSON.stringify(records, null, 2)}`);
        res.status(200).json(records);
      } else {
        next(createError(404, 'No stores found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteStoresByTitles(req, res, next) {
    try {
      const { storeNames } = req.body;

      if (!Array.isArray(storeNames) || storeNames.length === 0) {
        return next(createError(400, 'Invalid or empty store names array'));
      }

      const delAmount = await Store.destroy({
        where: {
          title: {
            [Op.in]: storeNames,
          },
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No stores found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getStoreById(req, res, next) {
    try {
      const {
        params: { storeId },
      } = req;

      const store = await Store.findOne({
        where: { id: storeId },
        attributes: ['id', 'title', 'description'],
        raw: true,
      });

      if (store) {
        console.log(`Result is: ${JSON.stringify(store, null, 2)}`);
        res.status(200).json(store);
      } else {
        next(createError(404, 'Store not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createStore(req, res, next) {
    try {
      const newStore = await Store.create(req.body);
      console.log(newStore.dataValues);
      res.status(201).json(newStore);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async updateStore(req, res, next) {
    try {
      const { id } = req.body;
      const store = await Store.findOne({ where: { id } });

      if (store) {
        await store.update(req.body);
        console.log(`Result is: ${JSON.stringify(store, null, 2)}`);
        res.status(201).json(store);
      } else {
        next(createError(404, 'Store not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteStore(req, res, next) {
    try {
      const {
        params: { storeId },
      } = req;

      const store = await Store.findOne({
        where: { id: storeId },
        attributes: ['id'],
      });

      const delAmount = await Store.destroy({
        where: {
          id: storeId,
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No store found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}

module.exports = new StoreController();
