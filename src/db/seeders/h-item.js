'use strict';

const { items } = require('../../constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('items', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('items', null, {});
  },
};
