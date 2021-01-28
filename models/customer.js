'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  //   class Customer extends Model {
  //     /**
  //      * Helper method for defining associations.
  //      * This method is not a part of Sequelize lifecycle.
  //      * The `models/index` file will call this method automatically.
  //      */
  //     static associate(models) {
  //       // define association here
  //     }
  //   };
  //   Customer.init({
  //     familyName: DataTypes.STRING,
  //     givenName: DataTypes.STRING,
  //     emailValue: DataTypes.STRING,
  //     emailType: DataTypes.STRING
      
  //   }, {
  //     sequelize,
  //     paranoid: true,
  //     modelName: 'Customer',
  //   });
  //   return Customer;
  // };

  const Customer = sequelize.define('Customer', {
    googleId: {
      type: DataTypes.STRING,
    },
    familyName: {
      type: DataTypes.STRING,
    },
    givenName: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.familyName} ${this.fullName}`;
      },
      set(value) {
        throw new Error(`Do not try to set the \`fullName\` value!`);
      }
    },
    email: {
      type: DataTypes.STRING,
    }
  }, {
    paranoid: true
  });
  Customer.associate = function(models) {
    Customer.hasMany(models.Favorite, {
      foreignKey: 'customer_id',
      sourceKey: 'id'
    });

    Customer.hasMany(models.Playlist, {
      foreignKey: 'customer_id',
      sourceKey: 'id'
    });

    // associations can be defined here
  };
  return Customer;
};