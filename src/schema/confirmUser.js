const db = require("../models/index")

const getUser = (user) => {
	return db.User.findAll({
		where: {confirmationToken: user.confirmationToken}
	})
	.then((result) => {
		return result[0]
	})
}

const sendConfirmation = (user) => {
	return user.update({hasConfirmedEmail: true, confirmationToken: ""})
	.then(u => {return user})
}

const confirmUser = (user) => {
	return new Promise((resolve, reject) => {
		getUser(user)
		.then((u) => {
			return sendConfirmation(u)
		})
		.then((u) => {
			resolve(u)
		})
	})
}

export default confirmUser;