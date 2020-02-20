'use strict';
module.exports = (sequelize, DataTypes) => {
  const pembelian_detail = sequelize.define('pembelian_detail', {
    pembelian_id: DataTypes.INTEGER,
    produk_id: DataTypes.INTEGER,
    jumlah_beli: DataTypes.INTEGER,
    tonase_beli: DataTypes.DOUBLE,
    is_deleted: DataTypes.INTEGER
  }, {
    tableName: 'pembelian_detail'
  });
  pembelian_detail.associate = function(models) {
    pembelian_detail.produk_id = pembelian_detail.belongsTo(models.produk, {as: 'produk', foreignKey: 'produk_id', target_key: 'id'})
  };
  return pembelian_detail;
};