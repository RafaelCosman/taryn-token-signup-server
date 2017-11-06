'use strict';

var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var TokenGift = sequelize.define('TokenGift', {
    id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    transactionHash: DataTypes.STRING
  });
  TokenGift.associate = function (models) {
    TokenGift.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return TokenGift;
};