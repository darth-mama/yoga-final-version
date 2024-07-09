"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Vinyasas", "userId");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Vinyasas", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
