'use strict';
module.exports = (sequelize, DataTypes) => {
  var TokenGift = sequelize.define('TokenGift', {
    transactionHash: DataTypes.STRING,
    isForReferral: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TokenGift;
};