'use strict';
const {
  Model
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
  //     name: DataTypes.STRING,
  //     email: DataTypes.STRING,
  //     rememberToken: DataTypes.STRING
  //   }, {
  //     sequelize,
  //     modelName: 'Customer',
  //   });
  //   return Customer;
  // };

  const Customer = sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'nameは必ず入力してください。'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'メールアドレスを入力してください。'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'passwordを必ず入力してください'
        }
      }
    }
  }, {});
  Customer.associate = function(models) {
    // associations can be defined here
  };
  return Customer;
};