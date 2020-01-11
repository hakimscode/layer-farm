'use strict';
module.exports = (sequelize, DataTypes) => {
  const kandang = sequelize.define('kandang', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    population: DataTypes.STRING,
    address: DataTypes.STRING,
    is_deleted: DataTypes.STRING
  }, {
    tableName: 'kandang'
  });
  kandang.associate = function(models) {
    // associations can be defined here
  };
  return kandang;
};