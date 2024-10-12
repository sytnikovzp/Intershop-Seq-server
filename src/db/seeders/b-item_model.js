'use strict';

const { item_models } = require('../../constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('item_models', item_models, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('item_models', null, {});
  },
};
