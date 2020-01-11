'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    customer_code: DataTypes.STRING,
    customer_name: DataTypes.STRING,
    address: DataTypes.STRING,
    is_deleted: DataTypes.INTEGER
  }, {});
  customer.associate = function(models) {
    // associations can be defined here
  };
  return customer;
};