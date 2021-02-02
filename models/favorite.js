'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // class Favorite extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // };
  // Favorite.init({
  //   customerId: DataTypes.INTEGER,
  //   songId: DataTypes.INTEGER,
  //   isPublic: DataTypes.INTEGER
  // }, {
  //   sequelize,
  //   modelName: 'Favorite',
  // }); 
  const Favorite = sequelize.define('Favorite', {
    customerId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER
  }, {});
  Favorite.associate = function(models) {
    // Favorite.belongsTo(models.Customer, {
    //   foreignKey: 'id',
    //   sourceKey: 'customerId'  //?customer_id
    // });
    // Favorite.belongsTo(models.Customer, {
    //   foreignKey: 'id',
    //   sourceKey: 'songId'
    // });
  };

  return Favorite;
};