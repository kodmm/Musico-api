'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // class Playlist extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // };
  // Playlist.init({
  //   customer_id: DataTypes.INTEGER,
  //   song_id: DataTypes.INTEGER,
  //   name: DataTypes.STRING
  // }, {
  //   sequelize,
  //   modelName: 'Playlist',
  // });

  const Playlist = sequelize.define('Playlist', {
    // customerId: DataTypes.INTEGER,
    // songId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  },{});

  Playlist.associate = function(models) {
    Playlist.belongsTo(models.Customer, {
      foreignKey: 'id',
      sourceKey: 'customerId'
    });

    Playlist.belongsTo(models.Song, {
      foreignKey: 'id',
      sourceKey: 'songId'
    });
  };
  return Playlist;
};