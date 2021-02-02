'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // class Song extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // };
  // Song.init({
  //   name: DataTypes.STRING,
  //   artistName: DataTypes.STRING,
  //   albumName: DataTypes.STRING,
  //   albumUrl: DataTypes.STRING,
  //   genre: DataTypes.STRING,
  //   releaseAt: DataTypes.DATE
  // }, {
  //   sequelize,
  //   modelName: 'Song',
  // });
  const Song = sequelize.define('Song', {
    trackId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    artistName: DataTypes.STRING,
    albumName: DataTypes.STRING,
    albumUrl: DataTypes.STRING,
    genre: DataTypes.STRING,
    releaseAt: DataTypes.DATE,
  }, {});

  Song.associate = function(models) {
    Song.hasMany(models.Favorite, {
      foreignKey: 'songId',
      // sourceKey: 'id'
    });
    Song.hasMany(models.Playlist, {
      foreignKey: 'song_id',
      // sourceKey: 'id'
    });
  }
  return Song;
};
