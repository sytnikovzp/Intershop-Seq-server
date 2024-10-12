'use strict';

const bcrypt = require('bcrypt');
require('dotenv').config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const { customers } = require('../../constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    for (const customer of customers) {
      customer.password = await bcrypt.hash(customer.password, SALT_ROUNDS);
    }

    await queryInterface.bulkInsert('customers', customers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customers', null, {});
  },
};
