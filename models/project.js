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
    project.kandang_id = project.belongsTo(models.kandang, {foreignKey: 'kandang_id', target_key: 'id'});
    project.hasMany(models.project_recording_harians, {foreignKey: 'project_id'})
  };

  project.findAllItems = function (qryWhere){
    return project.findAll({
      where: qryWhere,
      include : [{association: project.kandang_id}]
    })
  };

  project.findById = function (data){
    return project.findOne({
      where: {'id':data, 'is_deleted': 0},
      include : [{association: project.kandang_id}, 'project_recording_harians']
    })
  }

  return project;
};