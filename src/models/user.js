import db from "./index"
const crypto = require('crypto')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
// TODO make this an env var
const BASE_URL = "https://bookie-adherence-55816.netlify.com";

const sendConfirmationEmail = (user) => {
  const subject = "Confirm your email and redeem your FreeToken"
  const confirmationUrl = `${BASE_URL}/confirm/${user.confirmationToken}`
  const body = `Click this link to confirm your email: ${confirmationUrl}`

  const message = {
    to: user.email,
    from: "noreply@trusttoken.com",
    subject: "Confirm your email and receieve your token!",
    text: body,
  };
  sgMail.send(message);
};

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
          user.confirmationToken = crypto.randomBytes(20).toString("hex");
        },
        afterCreate: (user, options) => {
          sendConfirmationEmail(user);
        }
      },
      classMethods: {
        associate: function (models) { }
      }
    });
  User.associate = function (models) {
    User.hasMany(models.TokenGift, { foreignKey: 'userId' })
  }
  return User;
};