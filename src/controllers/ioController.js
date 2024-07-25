const createError = require('http-errors');

const {
  Brand,
  IM,
  Store,
  IT,
  Item,
  Order,
  Customer,
  IO,
  Sequelize: { Op },
  sequelize,
} = require('../db/models');

class IOController {
  async getBrandModelCounts(req, res, next) {
    try {
      const brands = await Brand.findAll({
        attributes: [
          'id',
          'title',
          [sequelize.fn('COUNT', sequelize.col('IMs.id')), 'modelCount'],
        ],
        include: [
          {
            model: IM,
            attributes: [],
          },
        ],
        group: ['Brand.id'],
        order: [['id', 'ASC']],
        raw: true,
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

  // =========================

  async getStoreItemTypeCounts(req, res, next) {
    try {
      const result = await sequelize.query(
        `
        SELECT
          stores.title AS store_title,
          item_types.title AS item_type_title,
          COUNT(items.id) AS item_count
        FROM
          stores
        JOIN
          items ON stores.id = items.store_id
        JOIN
          item_types ON items.type_id = item_types.id
        GROUP BY
          stores.title, item_types.title
        ORDER BY
          stores.title, item_types.title;
      `,
        { type: sequelize.QueryTypes.SELECT }
      );

      if (result.length > 0) {
        console.log(
          `Item type counts by store: ${JSON.stringify(result, null, 2)}`
        );
        res.status(200).json(result);
      } else {
        next(createError(404, 'No item types found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  // async getStoreItemTypeCounts(req, res, next) {
  //   try {
  //     const results = await Store.findAll({
  //       attributes: ['id', 'title'],
  //       include: [
  //         {
  //           model: Item,
  //           attributes: [
  //             'type_id',
  //             [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount'],
  //           ],
  //           include: [
  //             {
  //               model: IT,
  //               attributes: ['title'],
  //               as: 'itemType',
  //             },
  //           ],
  //           group: ['Item.type_id', 'itemType.id'],
  //         },
  //       ],
  //       group: ['Store.id', 'Item.type_id', 'itemType.id'],
  //       order: [['id', 'ASC']],
  //       raw: false,
  //     });

  //     if (results.length > 0) {
  //       console.log(`Result is: ${JSON.stringify(results, null, 2)}`);
  //       res.status(200).json(results);
  //     } else {
  //       next(createError(404, 'Stores not found'));
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     next(error);
  //   }
  // }

  // =========================

  async getTopCustomer(req, res, next) {
    try {
      const result = await sequelize.query(
        `
        SELECT 
          customers.full_name, 
          COUNT(orders.id) AS purchase_count 
        FROM 
          customers
        JOIN 
          orders ON customers.id = orders.customer_id 
        GROUP BY 
          customers.id 
        ORDER BY 
          purchase_count DESC 
        LIMIT 1;
      `,
        { type: sequelize.QueryTypes.SELECT }
      );

      if (result.length > 0) {
        console.log(`Top Customer is: ${JSON.stringify(result[0], null, 2)}`);
        res.status(200).json(result[0]);
      } else {
        next(createError(404, 'No customers found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  // async getTopCustomer(req, res, next) {
  //   try {
  //     const result = await Customer.findOne({
  //       attributes: [
  //         'full_name',
  //         [sequelize.fn('COUNT', sequelize.col('orders.id')), 'purchase_count'],
  //       ],
  //       include: [
  //         {
  //           model: Order,
  //           attributes: [],
  //         },
  //       ],
  //       group: ['Customer.id'],
  //       order: [[sequelize.literal('purchase_count'), 'DESC']],
  //       limit: 1,
  //       raw: true,
  //     });

  //     if (result) {
  //       console.log(`Top Customer is: ${JSON.stringify(result, null, 2)}`);
  //       res.status(200).json(result);
  //     } else {
  //       next(createError(404, 'No customers found'));
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     next(error);
  //   }
  // }

  // =========================

  async getExpensivePurchase(req, res, next) {
    try {
      const result = await sequelize.query(
        `
          SELECT
            customers.full_name,
            orders.id AS order_id,
            SUM(items.price * items.amount) AS total_purchase_amount
          FROM
            customers
          JOIN
            orders ON customers.id = orders.customer_id
          JOIN
            items_orders ON orders.id = items_orders.order_id
          JOIN
            items ON items_orders.item_id = items.id
          GROUP BY
            customers.full_name, orders.id
          ORDER BY
            total_purchase_amount DESC
          LIMIT 1;
        `,
        { type: sequelize.QueryTypes.SELECT }
      );

      if (result.length > 0) {
        console.log(
          `Customer with the most expensive purchase: ${JSON.stringify(
            result[0],
            null,
            2
          )}`
        );
        res.status(200).json(result[0]);
      } else {
        next(createError(404, 'No purchases found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  // async getExpensivePurchase(req, res, next) {
  //   try {
  //     const result = await Customer.findOne({
  //       attributes: [
  //         'full_name',
  //         [
  //           sequelize.fn(
  //             'SUM',
  //             sequelize.literal('items.price * items.amount')
  //           ),
  //           'total_purchase_amount',
  //         ],
  //       ],
  //       include: [
  //         {
  //           model: Order,
  //           attributes: [],
  //           include: [
  //             {
  //               model: IO,
  //               attributes: [],
  //               include: [
  //                 {
  //                   model: Item,
  //                   attributes: ['price', 'amount'],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //       group: ['Customer.id'],
  //       order: [[sequelize.literal('total_purchase_amount'), 'DESC']],
  //       limit: 1,
  //       raw: true,
  //     });

  //     if (result) {
  //       console.log(
  //         `Customer with the most expensive purchase: ${JSON.stringify(
  //           result,
  //           null,
  //           2
  //         )}`
  //       );
  //       res.status(200).json(result);
  //     } else {
  //       next(createError(404, 'No purchases found'));
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     next(error);
  //   }
  // }
}

module.exports = new IOController();
