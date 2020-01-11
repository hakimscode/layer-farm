'use strict';
module.exports = (sequelize, DataTypes) => {
  const standard_produksi = sequelize.define('standard_produksi', {
    name: DataTypes.STRING,
    percentage: DataTypes.STRING,
    is_deleted: DataTypes.INTEGER
  }, {
    tableName: 'standard_produksi'
  });
  standard_produksi.associate = function(models) {
    // associations can be defined here
  };
  return standard_produksi;
};