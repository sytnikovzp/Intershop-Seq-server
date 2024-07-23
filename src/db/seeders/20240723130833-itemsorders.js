'use strict';

const { items_orders } = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('items_orders', items_orders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('items_orders', null, {});
  },
};
