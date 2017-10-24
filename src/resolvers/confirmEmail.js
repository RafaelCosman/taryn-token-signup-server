const db = require("../models/index")

const getUserByConfirmationToken = (user) => {
  return db.User.findOne({
    where: { confirmationToken: user.confirmationToken }
  })
    .then(user => user)
}

const confirmEmail = (confirmationToken) => {
  return new Promise((resolve, reject) => {
    getUserByConfirmationToken(confirmationToken)
      .then(user => user.update({ hasConfirmedEmail: true, confirmationToken: null }))
      .then(user => resolve(user))
      .catch(error => reject("Invalid confirmation token."))
  })
}

export { confirmEmail };
