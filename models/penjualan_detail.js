'use strict';
module.exports = (sequelize, DataTypes) => {
  const penjualan_detail = sequelize.define('penjualan_detail', {
    penjualan_id: DataTypes.INTEGER,
    jumlah_jual: DataTypes.INTEGER,
    tonase_jual: DataTypes.DOUBLE,
    is_deleted: DataTypes.INTEGER
  }, {
    tableName: 'penjualan_detail'
  });
  penjualan_detail.associate = function(models) {
    penjualan_detail.penjualan_id = penjualan_detail.belongsTo(models.penjualan, {foreignKey: 'penjualan_id', target_key: 'id'})
  };
  return penjualan_detail;
};