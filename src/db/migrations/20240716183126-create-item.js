'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      type_id: {
        type: Sequelize.INTEGER,
      },
      brand_id: {
        type: Sequelize.INTEGER,
      },
      model_id: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.NUMERIC,
      },
      store_id: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('items');
  },
};
