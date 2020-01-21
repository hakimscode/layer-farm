'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('penjualan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      tanggal: {
        type: Sequelize.DATEONLY
      },
      project_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'project',
          key: 'id'
        }
      },
      customer_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'customers',
          key: 'id'
        }
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
    return queryInterface.dropTable('penjualan');
  }
};