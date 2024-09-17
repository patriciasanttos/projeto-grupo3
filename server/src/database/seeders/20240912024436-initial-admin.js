'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('admins', [{
      name: 'Admin',
      email: 'ong_sjpa@gmail.com',
      phone: 3299655493,
      password: '$2a$12$ZKiN0HEUDNvG9.dhDP66Be7lazfNTiixkeMmvbrAZ35VKGYgcnyxW',
      permissions: '6'
     }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {});
  }
};
