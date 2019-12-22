'use strict';
module.exports = (sequelize, DataTypes) => {
  const produk = sequelize.define('produk', {
    nama_produk: DataTypes.STRING,
    satuan: DataTypes.STRING,
    is_deleted: DataTypes.INTEGER
  }, {
    tableName: 'produk'
  });
  produk.associate = function(models) {
    produk.kategori_id = produk.belongsTo(models.produk_kategori, {foreignKey: 'id', target_key: 'kategori_id'});
  };

  produk.findAllItems = function (){
    return produk.findAll({
      where: {is_deleted: 0},
      include : [{association: produk.kategori_id}]
    })
  };

  produk.findById = function (data){
    return produk.findOne({
      where: {'id':data, 'is_deleted': 0},
      include : [{association: produk.kategori_id}]
    })
  }

  return produk;
};