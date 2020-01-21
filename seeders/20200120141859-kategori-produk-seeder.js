'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('produk_kategori', [
      {
        nama: 'Pakan',
      },
      {
        nama: "Ayam Pullet"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('produk_kategori', null, {});
  }
};
