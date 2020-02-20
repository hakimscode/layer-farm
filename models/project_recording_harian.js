'use strict';
module.exports = (sequelize, DataTypes) => {
  const project_recording_harian = sequelize.define('project_recording_harians', {
    project_id: DataTypes.INTEGER,
    tanggal: DataTypes.DATEONLY,
    hari: DataTypes.INTEGER,
    pakan: DataTypes.INTEGER,
    jumlah_telur: DataTypes.INTEGER,
    tonase_telur: DataTypes.DOUBLE
  }, {});
  project_recording_harian.associate = function(models) {
    project_recording_harian.project_id = project_recording_harian.belongsTo(models.project, {foreignKey: 'project_id', target_key: 'id'});
  };
  return project_recording_harian;
};