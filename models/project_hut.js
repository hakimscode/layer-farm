'use strict';
module.exports = (sequelize, DataTypes) => {
  const project_hut = sequelize.define('project_hut', {
    project_id: DataTypes.INTEGER
  }, {});
  project_hut.associate = function(models) {
    // associations can be defined here
  };
  return project_hut;
};