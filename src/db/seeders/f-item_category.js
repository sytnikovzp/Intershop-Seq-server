'use strict';

const { item_categories } = require('../../constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('item_categories', item_categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('item_categories', null, {});
  },
};
