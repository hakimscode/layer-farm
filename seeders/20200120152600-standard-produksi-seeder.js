'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('standard_produksi', [{
        name: 'Standard Panen',
        percentage: 60
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('standard_produksi', null, {});
  }
};
