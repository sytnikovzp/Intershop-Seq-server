'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IM extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IM.hasMany(models.Item, {
        foreignKey: 'modelId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      IM.belongsTo(models.Brand, { foreignKey: 'brandId' });
    }
  }
  IM.init(
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
      modelName: 'IM',
      tableName: 'item_models',
      timestamps: false,
      underscored: true,
    }
  );
  return IM;
};
