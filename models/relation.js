'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  

  const Relation = sequelize.define('Relation', {
    songId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
    },

    playlistId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    }
    },
  },{});

  Relation.associate = function(models) {
  };
  return Relation;
};