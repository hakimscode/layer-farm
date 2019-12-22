'use strict';
module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('supplier', {
    supplier_code : DataTypes.STRING,
    supplier_name : DataTypes.STRING,
    address : DataTypes.STRING,
    is_deleted : DataTypes.INTEGER
  }, {
    tableName: 'suppliers'
  });

  // todo find how to make field 'is_deleted' is not listed in array data
  
  Supplier.associate = function(models) {
    // models.Supplier.findAll();
  };
  return Supplier;
};