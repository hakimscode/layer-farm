'use strict';
module.exports = (sequelize, DataTypes) => {
  const gudang_telur = sequelize.define('gudang_telur', {
    jumlah: DataTypes.INTEGER,
    tonase: DataTypes.INTEGER
  }, {
    tableName: 'gudang_telur'
  });
  gudang_telur.associate = function(models) {
    // associations can be defined here
  };
  return gudang_telur;
};