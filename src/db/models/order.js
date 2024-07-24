'use strict';
const { Model, DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Customer, { foreignKey: 'customerId' });
      Order.belongsToMany(models.Item, { through: models.ItemsOrders });
    }
  }

  Order.init(
    {
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Sequelize.literal("nextval('order_code_seq')"),
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      customer_id: DataTypes.INTEGER,
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
      timestamps: false,
      underscored: true,
    }
  );

  return Order;
};
