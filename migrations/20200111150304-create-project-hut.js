'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('project_hut', {
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
      tonase_pakan: Sequelize.DOUBLE(10, 2),
      tonase_panen: Sequelize.DOUBLE(10, 2),
      jumlah_panen: Sequelize.DOUBLE(10, 2),
      modal_ayam: Sequelize.BIGINT(11),
      modal_pakan: Sequelize.BIGINT(11),
      jual_telur: Sequelize.BIGINT(11),
      is_deleted: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
      },
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
    return queryInterface.dropTable('project_hut');
  }
};