'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  IO.init(
    {
      item_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'IO',
      tableName: 'items_orders',
      timestamps: false,
      underscored: true,
    }
  );
  return IO;
};
