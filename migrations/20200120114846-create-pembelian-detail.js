'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pembelian_detail', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pembelian_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'pembelian',
          key: 'id'
        }
      },
      produk_id: {
        type: Sequelize.INTEGER(5),
        references: {
          model: 'produk',
          key: 'id'
        }
      },
      jumlah_beli: {
        type: Sequelize.INTEGER(11)
      },
      tonase_beli: Sequelize.DOUBLE(10,2),
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
    return queryInterface.dropTable('pembelian_detail');
  }
};