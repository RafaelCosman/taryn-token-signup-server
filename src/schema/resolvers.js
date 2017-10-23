const sendTokens = require('./sendTokens');

var client = require('graphql-client')({
  url: "https://api.graph.cool/simple/v1/cj8m6ujrq0evm0167mhdi4mta",
  headers: {
  }
})

module.exports = {
  Query: {
    user: (_, data) => {
      return client.query(
        `
          query {
            User(id:"cj94ks85w05fg0156ctn0bxkw"){
              id
              createdAt
            }
          }
        `
      )
      .then(data => {return(data.data.User)})
      .catch(error => console.error("AAARRRRGGG", error));
    }
  },
  Mutation: {
    sendTokens: (_, data) => {
      return sendTokens(data)
    }
  },
};