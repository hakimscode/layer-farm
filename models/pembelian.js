'use strict';
module.exports = (sequelize, DataTypes) => {
  const pembelian = sequelize.define('pembelian', {
    tanggal: DataTypes.DATE,
    project_id: DataTypes.INTEGER(11),
    supplier_id: DataTypes.INTEGER(11),
    is_deleted: DataTypes.INTEGER
  }, {
    tableName: 'pembelian'
  });
  pembelian.associate = function(models) {
    // associations can be defined here
  };
  return pembelian;
};