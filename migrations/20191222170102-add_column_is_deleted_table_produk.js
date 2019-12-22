'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'produk',
      'is_deleted',
      {
        type: Sequelize.INTEGER(1),
        after: 'satuan',
        defaultValue: 0
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'produk',
      'is_deleted'
    );
  }
};
