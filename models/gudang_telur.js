'use strict';
module.exports = (sequelize, DataTypes) => {
  const gudang_telur = sequelize.define('gudang_telur', {
    jumlah: DataTypes.INTEGER
  }, {});
  gudang_telur.associate = function(models) {
    // associations can be defined here
  };
  return gudang_telur;
};