'use strict';

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('adoptions', {
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
      animal_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      animal_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false
      },
      race: {
        type: DataTypes.STRING,
        allowNull: true
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true
      },
      vacine: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      castrated: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      age: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      temperament: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      observation: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      animal_observation: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      animal_created_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      tutors_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      phone: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false
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
    await queryInterface.dropTable('adoptions');
  }
};