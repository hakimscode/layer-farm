'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('penjualan_detail', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      penjualan_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'penjualan',
          key: 'id'
        }
      },
      jumlah_jual: {
        type: Sequelize.INTEGER(11)
      },
      tonase_jual: Sequelize.DOUBLE(10,2),
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
    return queryInterface.dropTable('penjualan_detail');
  }
};