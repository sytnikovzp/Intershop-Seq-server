const createError = require('http-errors');

const {
  Item,
  IC,
  IT,
  Brand,
  IM,
  Store,
  Sequelize: { Op },
} = require('../db/models');

class ItemController {
  async getItems(req, res, next) {
    try {
      const { limit, offset } = req.pagination;

      const records = await Item.findAll({
        attributes: ['id', 'price', 'amount'],
        include: [
          {
            model: IC,
            attributes: ['title'],
          },
          {
            model: IT,
            attributes: ['title'],
          },
          {
            model: Brand,
            attributes: ['title'],
          },
          {
            model: IM,
            attributes: ['title'],
          },
          {
            model: Store,
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
        next(createError(404, 'Items not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getAllRecordsAboveHalf(req, res, next) {
    try {
      const totalRecords = await Item.count();
      const halfCount = Math.floor(totalRecords / 2);
      const records = await Item.findAll({
        attributes: ['id', 'price', 'amount'],
        include: [
          {
            model: IC,
            attributes: ['title'],
          },
          {
            model: IT,
            attributes: ['title'],
          },
          {
            model: Brand,
            attributes: ['title'],
          },
          {
            model: IM,
            attributes: ['title'],
          },
          {
            model: Store,
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

  async getItemsByNames(req, res, next) {
    try {
      const { ItemId } = req.body;

      if (!Array.isArray(ItemId) || ItemId.length === 0) {
        return next(createError(400, 'Invalid or empty item names array'));
      }

      const records = await Item.findAll({
        attributes: ['id', 'price', 'amount'],
        include: [
          {
            model: IC,
            attributes: ['title'],
          },
          {
            model: IT,
            attributes: ['title'],
          },
          {
            model: Brand,
            attributes: ['title'],
          },
          {
            model: IM,
            attributes: ['title'],
          },
          {
            model: Store,
            attributes: ['title'],
          },
        ],

        where: {
          id: {
            [Op.in]: ItemId,
          },
        },
        raw: true,
      });

      if (records.length > 0) {
        console.log(`Result is: ${JSON.stringify(records, null, 2)}`);
        res.status(200).json(records);
      } else {
        next(createError(404, 'No items found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteItemsByTitles(req, res, next) {
    try {
      const { ItemId } = req.body;

      if (!Array.isArray(ItemId) || ItemId.length === 0) {
        return next(createError(400, 'Invalid or empty item names array'));
      }

      const delAmount = await Item.destroy({
        where: {
          id: {
            [Op.in]: ItemId,
          },
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No items found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getItemById(req, res, next) {
    try {
      const {
        params: { itemId },
      } = req;

      const item = await Item.findOne({
        attributes: ['id', 'price', 'amount'],
        include: [
          {
            model: IC,
            attributes: ['title'],
          },
          {
            model: IT,
            attributes: ['title'],
          },
          {
            model: Brand,
            attributes: ['title'],
          },
          {
            model: IM,
            attributes: ['title'],
          },
          {
            model: Store,
            attributes: ['title'],
          },
        ],
        where: { id: itemId },
        raw: true,
      });

      if (item) {
        console.log(`Result is: ${JSON.stringify(item, null, 2)}`);
        res.status(200).json(item);
      } else {
        next(createError(404, 'Item not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createItem(req, res, next) {
    try {
      const {
        price,
        amount,
        categoryTitle,
        typeTitle,
        brandTitle,
        modelTitle,
        storeTitle,
      } = req.body;

      const category = await IC.findOne({ where: { title: categoryTitle } });
      const type = await IT.findOne({ where: { title: typeTitle } });
      const brand = await Brand.findOne({ where: { title: brandTitle } });
      const model = await IM.findOne({ where: { title: modelTitle } });
      const store = await Store.findOne({ where: { title: storeTitle } });

      const checkErrors = () => {
        switch (true) {
          case !category:
            return next(createError(404, 'Category not found!'));
          case !type:
            return next(createError(404, 'Type not found!'));
          case !brand:
            return next(createError(404, 'Brand not found!'));
          case !model:
            return next(createError(404, 'Model not found!'));
          case !store:
            return next(createError(404, 'Store not found!'));
          default:
            return null;
        }
      };

      checkErrors();

      const newItem = await Item.create({
        price,
        amount,
        category_id: category.id,
        type_id: type.id,
        brand_id: brand.id,
        model_id: model.id,
        store_id: store.id,
      });

      console.log(newItem.dataValues);
      res.status(201).json(newItem);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async updateItem(req, res, next) {
    try {
      const {
        id,
        categoryTitle,
        typeTitle,
        brandTitle,
        modelTitle,
        storeTitle,
        ...updateData
      } = req.body;
      const category = await IC.findOne({ where: { title: categoryTitle } });
      const type = await IT.findOne({ where: { title: typeTitle } });
      const brand = await Brand.findOne({ where: { title: brandTitle } });
      const model = await IM.findOne({ where: { title: modelTitle } });
      const store = await Store.findOne({ where: { title: storeTitle } });

      const checkErrors = () => {
        switch (true) {
          case !category:
            return next(createError(404, 'Category not found!'));
          case !type:
            return next(createError(404, 'Type not found!'));
          case !brand:
            return next(createError(404, 'Brand not found!'));
          case !model:
            return next(createError(404, 'Model not found!'));
          case !store:
            return next(createError(404, 'Store not found!'));
          default:
            return null;
        }
      };

      checkErrors();

      const item = await Item.findOne({ where: { id } });

      if (item) {
        await item.update({
          ...updateData,
          category_id: category.id,
          type_id: type.id,
          brand_id: brand.id,
          model_id: model.id,
          store_id: store.id,
        });
        console.log(`Result is: ${JSON.stringify(item, null, 2)}`);
        res.status(201).json(item);
      } else {
        next(createError(404, 'Item not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteItem(req, res, next) {
    try {
      const {
        params: { itemId },
      } = req;

      const item = await Item.findOne({
        where: { id: itemId },
        attributes: ['id'],
      });

      const delAmount = await Item.destroy({
        where: {
          id: itemId,
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No item found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}

module.exports = new ItemController();
