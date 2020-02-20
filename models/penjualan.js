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
    penjualan.hasOne(models.penjualan_detail, {as: 'penjualan_detail', foreignKey: 'penjualan_id'});
    penjualan.customer_id = penjualan.belongsTo(models.customer, {as: 'customer', foreignKey: 'customer_id', target_key: 'id'})
    penjualan.project_id = penjualan.belongsTo(models.project, {as: 'project', foreignKey: 'project_id', target_key:'id'})
  };

  // penjualan.findAllItems = function (){
  //   return penjualan.findAll({
  //     where: {is_deleted: 0},
  //     include : [detail]
  //   })
  // };

  // penjualan.findById = function (data){
  //   return penjualan.findOne({
  //     where: {'id':data, 'is_deleted': 0},
  //     include : [{association: produk.kategori_id}]
  //   })
  // }

  return penjualan;
};