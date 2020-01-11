'use strict';
module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
    kandang_id: DataTypes.INTEGER,
    periode: DataTypes.INTEGER,
    populasi_awal: DataTypes.INTEGER,
    tanggal_mulai: DataTypes.DATEONLY,
    tanggal_closing: DataTypes.DATEONLY,
    status: DataTypes.INTEGER,
    is_deleted: DataTypes.INTEGER
  }, {
    tableName: 'project'
  });
  project.associate = function(models) {
    // associations can be defined here
  };
  return project;
};