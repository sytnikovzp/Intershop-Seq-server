'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('items_orders', {
      item_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'items',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'orders',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });

    await queryInterface.addConstraint('items_orders', {
      fields: ['item_id', 'order_id'],
      type: 'primary key',
      name: 'items_orders_pkey',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('items_orders');
  },
};
