'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('gudang_telur', [{
        jumlah: 0,
        tonase: 0
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('gudang_telur', null, {});
  }
};
