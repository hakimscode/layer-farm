'use strict';
module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
    periode: DataTypes.INTEGER
  }, {});
  project.associate = function(models) {
    // associations can be defined here
  };
  return project;
};