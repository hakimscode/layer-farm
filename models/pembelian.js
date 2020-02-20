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
    pembelian.hasOne(models.pembelian_detail, {as: 'pembelian_detail', foreignKey: 'pembelian_id'});
    pembelian.supplier_id = pembelian.belongsTo(models.supplier, {as: 'supplier', foreignKey: 'supplier_id', target_key: 'id'})
    pembelian.project_id = pembelian.belongsTo(models.project, {as: 'project', foreignKey: 'project_id', target_key:'id'})
  };
  return pembelian;
};