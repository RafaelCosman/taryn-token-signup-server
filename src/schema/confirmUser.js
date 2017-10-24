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

const secondaryMutation = (user) => (
		`
      secondaryGift:createTokenGift(userId:"${user.referrer.id}", forReferral: true){
        id
      }
		`
)

const sendConfirmation = (user) => {
	let mutation =
		`
      updateUser(id: "${user.id}", hasConfirmedEmail: true, confirmationToken: null) {
        id
        ethereumAddress
        email
      }
      primaryGift:createTokenGift(userId:"${user.id}", forReferral: false){
        id
      }
		`
	if (!!user.referrer && !!user.referrer.id) {mutation += secondaryMutation(user) }
	return client.query(
		`mutation {${mutation}}`
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
		.then((u) => {
			resolve(u)
		})
	})
}

export default confirmUser;