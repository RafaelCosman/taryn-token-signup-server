'use strict';
module.exports = (sequelize, DataTypes) => {
  var TokenGift = sequelize.define('TokenGift', {
    referrerId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    transactionHash: DataTypes.STRING,
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return TokenGift;
};