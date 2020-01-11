'use strict';
module.exports = (sequelize, DataTypes) => {
  const project_recording_harian = sequelize.define('project_recording_harian', {
    project_id: DataTypes.INTEGER
  }, {});
  project_recording_harian.associate = function(models) {
    // associations can be defined here
  };
  return project_recording_harian;
};