'use strict';

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('adoptions-forms', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
      tutors_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      phone: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      cpf: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      animal_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('adoptions-forms');
  }
};