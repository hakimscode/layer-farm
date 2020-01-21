'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('project', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      kandang_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'kandang',
          key: 'id'
        }
      },
      periode: {
        type: Sequelize.INTEGER(4)
      },
      populasi_awal: Sequelize.INTEGER(4),
      tanggal_mulai: Sequelize.DATEONLY,
      tanggal_closing: Sequelize.DATEONLY,
      status: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
      },
      is_deleted: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('project');
  }
};