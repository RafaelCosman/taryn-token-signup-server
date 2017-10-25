const db = require("../models/index")

const getUserByConfirmationToken = (confirmationToken) => {
  return db.User.findOne({
    where: { confirmationToken }
  })
    .then(user => user)
}

const confirmEmail = (confirmationToken) => {
  return new Promise((resolve, reject) => {
    getUserByConfirmationToken(confirmationToken)
      .then(user => user.update({ hasConfirmedEmail: true, confirmationToken: null }))
      .then(user => resolve(user))
      .then(user => {
        return db.TokenGift.create({});
      })
      .catch(error => {
        console.error(error);
        reject("Invalid confirmation token.");
      });
  })
}

export { confirmEmail };
