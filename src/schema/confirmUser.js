var client = require('graphql-client')({
  url: "https://api.graph.cool/simple/v1/cj8m6ujrq0evm0167mhdi4mta",
  headers: {
  }
})

const getUser = (user) => {
	return client.query(
		`query {
				User(confirmationToken: "${user.confirmationToken}") {
				id
				ethereumAddress
				email
				referrer {
						id		
				}
				}
		}`
	)
	.then(function (userQueryResult) {
      if (userQueryResult.error) {
        return Promise.reject(userQueryResult.data.error)
      } else {
        return Promise.resolve(userQueryResult.data.User)
      }
    })
}

const sendConfirmation = (user) => {
	return client.query(
		`mutation {
      updateUser(id: "${user.id}", hasConfirmedEmail: true, confirmationToken: null) {
        id
        ethereumAddress
        email
      }
      foo:createTokenGift(userId:"${user.id}", forReferral: false){
        id
      }
      bar:createTokenGift(userId:"${user.id}", forReferral: false){
        id
      }
		}`
	)
	.then(function (userQueryResult) {
		if (userQueryResult.error) {
			return Promise.reject(userQueryResult.data.error)
		} else {
			return Promise.resolve(userQueryResult.data.updateUser)
		}
	})
}

const confirmUser = (user) => {
	return new Promise((resolve, reject) => {
		getUser(user)
		.then((u) => {
			return sendConfirmation(u)
		})
		.then((user) => {
			resolve(user)
		})
	})
}

export default confirmUser;