'use strict';
module.exports = (sequelize, DataTypes) => {
  const penjualan = sequelize.define('penjualan', {
    tanggal: DataTypes.DATE,
    project_id: DataTypes.INTEGER(11),
    customer_id: DataTypes.INTEGER(11),
    is_deleted: DataTypes.INTEGER
  }, {
    tableName: 'penjualan'
  });
  penjualan.associate = function(models) {
    penjualan.hasMany(models.penjualan_detail, {as: 'detail', foreignKey: 'penjualan_id'})
  };

  // penjualan.findAllItems = function (){
  //   return penjualan.findAll({
  //     where: {is_deleted: 0},
  //     include : [detail]
  //   })
  // };

  // produk.findById = function (data){
  //   return produk.findOne({
  //     where: {'id':data, 'is_deleted': 0},
  //     include : [{association: produk.kategori_id}]
  //   })
  // }

  return penjualan;
};