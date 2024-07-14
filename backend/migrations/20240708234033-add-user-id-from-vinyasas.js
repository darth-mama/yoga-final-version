// "use strict";

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     const tableInfo = await queryInterface.describeTable("Vinyasas");
//     if (!tableInfo.userId) {
//       await queryInterface.addColumn("Vinyasas", "userId", {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {
//           model: "Users",
//           key: "id",
//         },
//       });
//     }
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.removeColumn("Vinyasas", "userId");
//   },
// };
