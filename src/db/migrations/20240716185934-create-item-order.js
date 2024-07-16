'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('item_order', {
      item_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('item_order');
  },
};
