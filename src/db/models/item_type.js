'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IT.hasMany(models.Item, {
        foreignKey: 'type_id',
        as: 'items',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  IT.init(
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
      modelName: 'IT',
      tableName: 'item_types',
      timestamps: false,
      underscored: true,
    }
  );
  return IT;
};
