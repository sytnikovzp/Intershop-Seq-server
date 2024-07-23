'use strict';

const { item_types } = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('item_types', item_types, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('item_types', null, {});
  },
};
