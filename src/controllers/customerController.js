const createError = require('http-errors');

const {
  Customer,
  Sequelize: { Op },
} = require('../db/models');

class CustomerController {
  async getCustomers(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const records = await Customer.findAll({
        attributes: ['id', 'full_name', 'email', 'password'],
        raw: true,
        limit,
        offset,
        order: [['id', 'ASC']],
      });

      if (records.length > 0) {
        console.log(`Result is: ${JSON.stringify(records, null, 2)}`);
        res.status(200).json(records);
      } else {
        next(createError(404, 'Customers not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getAllRecordsAboveHalf(req, res, next) {
    try {
      const totalRecords = await Customer.count();
      const halfCount = Math.floor(totalRecords / 2);
      const records = await Customer.findAll({
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

  async getCustomersByNames(req, res, next) {
    try {
      const { customerNames } = req.body;

      if (!Array.isArray(customerNames) || customerNames.length === 0) {
        return next(createError(400, 'Invalid or empty customer names array'));
      }

      const records = await Customer.findAll({
        where: {
          full_name: {
            [Op.in]: customerNames,
          },
        },
      });

      if (records.length > 0) {
        console.log(`Result is: ${JSON.stringify(records, null, 2)}`);
        res.status(200).json(records);
      } else {
        next(createError(404, 'No customers found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteCustomersByTitles(req, res, next) {
    try {
      const { customerNames } = req.body;

      if (!Array.isArray(customerNames) || customerNames.length === 0) {
        return next(createError(400, 'Invalid or empty customer names array'));
      }

      const delAmount = await Customer.destroy({
        where: {
          full_name: {
            [Op.in]: customerNames,
          },
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No customers found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getCustomerById(req, res, next) {
    try {
      const {
        params: { customerId },
      } = req;

      const customer = await Customer.findOne({
        where: { id: customerId },
        attributes: ['id', 'full_name', 'email', 'password'],
        raw: true,
      });

      if (customer) {
        console.log(`Result is: ${JSON.stringify(customer, null, 2)}`);
        res.status(200).json(customer);
      } else {
        next(createError(404, 'Customer not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createCustomer(req, res, next) {
    try {
      const newCustomer = await Customer.create(req.body);
      console.log(newCustomer.dataValues);
      res.status(201).json(newCustomer);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async updateCustomer(req, res, next) {
    try {
      const { id } = req.body;
      const customer = await Customer.findOne({ where: { id } });

      if (customer) {
        await customer.update(req.body);
        console.log(`Result is: ${JSON.stringify(customer, null, 2)}`);
        res.status(201).json(customer);
      } else {
        next(createError(404, 'Customer not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async deleteCustomer(req, res, next) {
    try {
      const {
        params: { customerId },
      } = req;

      const customer = await Customer.findOne({
        where: { id: customerId },
        attributes: ['id'],
      });

      const delAmount = await Customer.destroy({
        where: {
          id: customerId,
        },
      });

      if (delAmount > 0) {
        console.log(`Number of deleting rows: ${delAmount}`);
        res.status(204).send();
      } else {
        next(createError(404, 'No customer found to delete'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}

module.exports = new CustomerController();
