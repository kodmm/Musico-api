'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  //  await queryInterface.bulkInsert('Customers', [{
  //    googleId: 12345,
  //    familyName: 'Sakurai',
  //    givenName: 'Sho',
  //    email: 'Sakurai@arashi',
  //    createdAt: date,
  //    updatedAt: date

  //    }], {});
  await queryInterface.bulkInsert('Playlists', [{
    customerId: 2,
    songId: null,
    name: 'PowerSong',
    isPublic: null,
    createdAt: date,
    updatedAt: date,
    trackId: null

    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
