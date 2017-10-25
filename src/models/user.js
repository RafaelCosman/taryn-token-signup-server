const crypto = require('crypto')

const Sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    email: DataTypes.STRING,
    confirmationToken: DataTypes.STRING,
    hasConfirmedEmail: DataTypes.BOOLEAN,
    ethereumAddress: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.confirmationToken = crypto.randomBytes(20).toString("hex")
      }
    },
  });
  User.associate = function(models) {
    User.hasMany(models.TokenGift, {foreignKey: 'userId'})
  }
  return User;
};