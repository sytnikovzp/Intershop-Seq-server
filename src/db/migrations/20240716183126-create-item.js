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
        references: {
          model: 'item_categories',
          key: 'id',
        },
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'item_types',
          key: 'id',
        },
      },
      brand_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'brands',
          key: 'id',
        },
      },
      model_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'item_models',
          key: 'id',
        },
      },
      price: {
        type: Sequelize.NUMERIC,
      },
      store_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'stores',
          key: 'id',
        },
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
