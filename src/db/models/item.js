'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
    {
      category_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      model_id: DataTypes.INTEGER,
      price: DataTypes.NUMERIC,
      store_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Item',
      tableName: 'items',
      timestamps: false,
      underscored: true,
    }
  );
  return Item;
};
