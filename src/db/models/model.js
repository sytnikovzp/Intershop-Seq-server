'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Model.init(
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
      modelName: 'Model',
      tableName: 'models',
      timestamps: false,
      underscored: true,
    }
  );
  return Model;
};
