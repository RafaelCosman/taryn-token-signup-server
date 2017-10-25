'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crypto = require('crypto');
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
// TODO make this an env var
var BASE_URL = "https://bookie-adherence-55816.netlify.com";

var sendConfirmationEmail = function sendConfirmationEmail(user) {
  var subject = "Confirm your email and redeem your FreeToken";
  var confirmationUrl = BASE_URL + '/confirm/' + user.confirmationToken;
  var body = 'Click this link to confirm your email: ' + confirmationUrl;

  var message = {
    to: user.email,
    from: "noreply@trusttoken.com",
    subject: "Confirm your email and receieve your token!",
    text: body
  };
  sgMail.send(message);
};

var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    email: DataTypes.STRING,
    confirmationToken: DataTypes.STRING,
    hasConfirmedEmail: DataTypes.BOOLEAN,
    ethereumAddress: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function beforeCreate(user, options) {
        user.confirmationToken = crypto.randomBytes(20).toString("hex");
      },
      afterCreate: function afterCreate(user, options) {
        sendConfirmationEmail(user);
      }
    },
    classMethods: {
      associate: function associate(models) {}
    }
  });
  User.associate = function (models) {
    User.hasMany(models.TokenGift, { foreignKey: 'userId' });
  };
  return User;
};