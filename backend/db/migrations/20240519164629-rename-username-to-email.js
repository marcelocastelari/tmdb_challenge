'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'username', 'email');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'email', 'username');
  }
};
