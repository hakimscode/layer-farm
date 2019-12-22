'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('produk', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      kategori_id: {
        type: Sequelize.INTEGER(5),
        references: {
          model: 'produk_kategori',
          key: 'id'
        }
      },
      nama_produk: {
        type: Sequelize.STRING(50)
      },
      satuan: Sequelize.STRING(15),
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
    return queryInterface.dropTable('produk');
  }
};