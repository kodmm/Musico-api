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
    songId: {
      type: DataTypes.INTEGER
    },
    trackId: {
      type: DataTypes.INTEGER
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
    
  };
  return Playlist;
};