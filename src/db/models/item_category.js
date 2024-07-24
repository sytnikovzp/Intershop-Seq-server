'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IC extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IC.hasMany(models.Item, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  IC.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'IC',
      tableName: 'item_categories',
      timestamps: false,
      underscored: true,
    }
  );
  return IC;
};
