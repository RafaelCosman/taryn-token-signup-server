const db = require("../models/index")

const createUser = (user) => {
  return new Promise((resolve, reject) => {
    db.User.create(user)
      .then(user => resolve(user.dataValues))
      .catch(error => {
        console.error(error);
        reject("User email or ethereum address not unique.");
      });
  })
}

export default createUser;  