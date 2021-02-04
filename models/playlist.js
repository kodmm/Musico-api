'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  

  const Playlist = sequelize.define('Playlist', {
    customerId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },{});

  Playlist.associate = function(models) {
    Playlist.belongsToMany(models.Song, { 
      through: models.Relation,
      foreignKey: 'playlistId',
      otherKey: 'songId'
    })
  };
  return Playlist;
};