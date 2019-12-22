'use strict';
module.exports = (sequelize, DataTypes) => {
  const produk_kategori = sequelize.define('produk_kategori', {
    nama : DataTypes.STRING,
    is_deleted : DataTypes.INTEGER
  }, {
    tableName: 'produk_kategori'
  });
  produk_kategori.associate = function(models) {
    produk_kategori.hasMany(models.produk, {foreignKey: 'kategori_id'});
  };
  return produk_kategori;
};