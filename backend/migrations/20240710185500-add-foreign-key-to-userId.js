// "use strict";

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.addConstraint("Vinyasas", {
//       fields: ["userId"],
//       type: "foreign key",
//       name: "fk_userId", // optional
//       references: {
//         table: "Users",
//         field: "id",
//       },
//       onDelete: "cascade",
//       onUpdate: "cascade",
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.removeConstraint("Vinyasas", "fk_userId");
//   },
// };
