const db = require("../models/index");

const getUserByConfirmationToken = confirmationToken => {
  return db.User.findOne({
    where: { confirmationToken }
  });
};

const confirmEmail = confirmationToken => {
  return new Promise((resolve, reject) => {
    let user;
    getUserByConfirmationToken(confirmationToken).then(u => {
      user = u;return u.createTokenGift();
    }).then(tokenGift => user.update({ hasConfirmedEmail: true, confirmationToken: null })).then(tokenGift => {
      console.log(user.dataValues);resolve(user.dataValues);
    }).catch(error => reject("Invalid confirmation token."));
  });
};

export { confirmEmail };