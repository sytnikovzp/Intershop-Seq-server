const createError = require('http-errors');

const {
  Order,
  Customer,
  Sequelize: { Op },
} = require('../db/models');

class OrderController {
  async getOrders(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const records = await Order.findAll({
        attributes: ['id', 'code', 'date', 'amount', 'paid'],
        include: [
          {
            model: Customer,
            attributes: ['full_name'],
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
        next(createError(404, 'Orders not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getAllRecordsAboveHalf(req, res, next) {
    try {
      const totalRecords = await Order.count();
      const halfCount = Math.floor(totalRecords / 2);
      const records = await Order.findAll({
        attributes: ['id', 'code', 'date', 'amount', 'paid'],
        include: [
          {
            model: Customer,
            attributes: ['full_name'],
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

  async getOrdersByNames(req, res, next) {
    try {
      const { orderCodes } = req.body;

      if (!Array.isArray(orderCodes) || orderCodes.length === 0) {
        return next(createError(400, 'Invalid or empty order names array'));
      }

      const records = await Order.findAll({
        attributes: ['id', 'code', 'date', 'amount', 'paid'],
        include: [
          {
            model: Customer,
            attributes: ['full_name'],
          },
        ],
        where: {
          code: {
            [Op.in]: orderCodes,
          },
        },
        raw: true,
        order: [['id', 'ASC']],
      });

      if (records.length > 0) {
        console.log(`Result is: ${JSON.stringify(records, null, 2)}`);
        res.status(200).json(records);
      } else {
        next(createError(404, 'No orders found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteOrdersByTitles(req, res, next) {
    try {
      const { orderCodes } = req.body;

      if (!Array.isArray(orderCodes) || orderCodes.length === 0) {
        return next(createError(400, 'Invalid or empty order names array'));
      }

      const delAmount = await Order.destroy({
        where: {
          code: {
            [Op.in]: orderCodes,
          },
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No orders found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getOrderById(req, res, next) {
    try {
      const {
        params: { orderId },
      } = req;

      const order = await Order.findOne({
        where: { id: orderId },
        attributes: ['id', 'code', 'date', 'amount', 'paid'],
        include: [
          {
            model: Customer,
            attributes: ['full_name'],
          },
        ],
        raw: true,
      });

      if (order) {
        console.log(`Result is: ${JSON.stringify(order, null, 2)}`);
        res.status(200).json(order);
      } else {
        next(createError(404, 'Order not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createOrder(req, res, next) {
    try {
      const { code, amount, paid, customerName } = req.body;

      const customer = await Customer.findOne({
        where: { full_name: customerName },
      });

      if (!customer) {
        return next(createError(404, 'Customer not found!'));
      }

      const newOrder = await Order.create({
        code,
        amount,
        paid,
        customer_id: customer.id,
      });

      console.log(newOrder.dataValues);
      res.status(201).json(newOrder);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async updateOrder(req, res, next) {
    try {
      const { id, customerName, ...updateData } = req.body;
      const customer = await Customer.findOne({
        where: { full_name: customerName },
      });

      if (!customer) {
        return next(createError(404, 'Customer not found!'));
      }

      const order = await Order.findOne({ where: { id } });

      if (order) {
        await order.update({
          ...updateData,
          customer_id: customer.id,
        });
        console.log(`Result is: ${JSON.stringify(order, null, 2)}`);
        res.status(201).json(order);
      } else {
        next(createError(404, 'Item order not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const {
        params: { orderId },
      } = req;

      const order = await Order.findOne({
        where: { id: orderId },
        attributes: ['id'],
      });

      const delAmount = await Order.destroy({
        where: {
          id: orderId,
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No order found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}

module.exports = new OrderController();
