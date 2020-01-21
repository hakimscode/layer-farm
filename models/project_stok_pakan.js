'use strict';
module.exports = (sequelize, DataTypes) => {
  const project_stok_pakan = sequelize.define('project_stok_pakan', {
    projet_id: DataTypes.NUMBER
  }, {});
  project_stok_pakan.associate = function(models) {
    // associations can be defined here
  };
  return project_stok_pakan;
};