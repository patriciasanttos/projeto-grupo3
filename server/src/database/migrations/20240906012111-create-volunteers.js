'use strict';

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('volunteers', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      responsible_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: true
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      availability: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      study_schedule: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sector: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profession: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      observation: {
        type: DataTypes.TEXT,
        allowNull: true
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
    await queryInterface.dropTable('volunteers');
  }
};