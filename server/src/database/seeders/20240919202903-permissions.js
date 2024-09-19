"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("permissions", [
      {
        id: 1,
        name: "animals",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "sponsorships",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: "adoptions",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: "volunteers",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        name: "admins",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        name: "all",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
