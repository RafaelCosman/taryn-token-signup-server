"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var db = require("../models/index");

var createUser = function createUser(user) {
  return new Promise(function (resolve, reject) {
    db.User.create(user).then(function (user) {
      return resolve(user.dataValues);
    }).catch(function (error) {
      console.error(error);
      reject("User email or ethereum address not unique.");
    });
  });
};

exports.default = createUser;