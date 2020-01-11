'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('project_recording_harians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      project_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'project',
          key: 'id'
        }
      },
      tanggal: Sequelize.DATEONLY,
      hari: Sequelize.INTEGER(4),
      pakan: Sequelize.INTEGER(4),
      jumlah_telur: Sequelize.INTEGER(4),
      tonase_telur: Sequelize.DOUBLE(4, 2),
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('project_recording_harians');
  }
};