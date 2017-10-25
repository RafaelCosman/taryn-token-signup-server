"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var db = require("../models/index");

var getUserByConfirmationToken = function getUserByConfirmationToken(confirmationToken) {
  return db.User.findOne({
    where: { confirmationToken: confirmationToken }
  });
};

var confirmEmail = function confirmEmail(confirmationToken) {
  return new Promise(function (resolve, reject) {
    var user = void 0;
    getUserByConfirmationToken(confirmationToken).then(function (u) {
      user = u;return u.createTokenGift();
    }).then(function (tokenGift) {
      return user.update({ hasConfirmedEmail: true, confirmationToken: null });
    }).then(function (tokenGift) {
      console.log(user.dataValues);resolve(user.dataValues);
    }).catch(function (error) {
      return reject("Invalid confirmation token.");
    });
  });
};

exports.confirmEmail = confirmEmail;