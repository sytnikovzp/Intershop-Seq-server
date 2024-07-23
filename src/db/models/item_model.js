'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item_model.hasMany(models.Item, {
        foreignKey: 'modelId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Item_model.belongsTo(models.Brand, { foreignKey: 'brandId' });
    }
  }
  Item_model.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      brand_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Item_model',
      tableName: 'item_models',
      timestamps: false,
      underscored: true,
    }
  );
  return Item_model;
};
