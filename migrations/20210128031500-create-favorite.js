'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: { model: 'Customers', key: 'id' },
        onUpdate: 'cascade' //(任意)連動して自動更新する
      },
      songId: {
        type: Sequelize.INTEGER,
        references: { model: 'Songs', key: 'id'},
        onUpdate: 'cascade',  
        onDelete: 'cascade' //(任意)連動して自動削除する
      },
      isPublic: {
        type: Sequelize.ENUM,
        values: ['private', 'public']

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Favorites');
  }
};