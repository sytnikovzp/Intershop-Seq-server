'use strict';

const bcrypt = require('bcrypt');

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order, {
        foreignKey: 'customerId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Customer.init(
    {
      full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        set(value) {
          this.setDataValue('password', bcrypt.hashSync(value, 9));
        },
      },
    },
    {
      sequelize,
      modelName: 'Customer',
      tableName: 'customers',
      timestamps: false,
      underscored: true,
    }
  );
  return Customer;
};
