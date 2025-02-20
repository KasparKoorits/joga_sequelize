module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("authors", [
      {
        id: 1,
        name: "Ashley Galvin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Patrick Beach",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "MacKenzie Miller",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("authors", null, {});
  },
};
