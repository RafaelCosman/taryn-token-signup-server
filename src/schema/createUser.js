var client = require('graphql-client')({
  url: "https://api.graph.cool/simple/v1/cj8m6ujrq0evm0167mhdi4mta",
  headers: {
  }
})

const _createUser = (user) => {
    let mutation
    if (user.referrerId) {
        mutation = `createUser(email: "${user.email}", ethereumAddress: "${user.ethereumAddress}", referrerId: "${user.referrerId}")`
    } else {
        mutation = `createUser(email: "${user.email}", ethereumAddress: "${user.ethereumAddress}")`
    }
    const fullMutation = 
		`
        mutation {${mutation}{
                id
                email
                ethereumAddress 
            }

        }
    `;
	return client.query(fullMutation)
	.then(function (userQueryResult) {
      if (userQueryResult.error) {
        return Promise.reject(userQueryResult.data.errors)
      } else {
        return Promise.resolve(userQueryResult.data.createUser)
      }
    })
}

const createUser = (user) => {
	return new Promise((resolve, reject) => {
		_createUser(user)
		.then((u) => {
            console.log("CREATING USER", u)
			resolve(u)
		})
        .catch((c) => { reject(c)})
	})
}

export default createUser;