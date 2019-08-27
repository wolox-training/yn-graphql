'use strict';
module.exports = {
  up: (queryInterface, sequelize) =>
    queryInterface.removeColumn('users', 'username', {
      type: sequelize.STRING,
      allowNull: false
    }),
  down: queryInterface => queryInterface.removeColumn('users', 'username')
};
