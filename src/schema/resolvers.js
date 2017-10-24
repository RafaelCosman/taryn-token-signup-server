const sendTokens = require('./sendTokens');

var client = require('graphql-client')({
  url: "https://api.graph.cool/simple/v1/cj8m6ujrq0evm0167mhdi4mta",
  headers: {
  }
})

import confirmUser from "./confirmUser";

module.exports = {
  Query: {
    user: (_, data) => {
      return client.query(
        `
          query {
            User(id:"${data.id}"){
              id
              createdAt
            }
          }
        `
      )
      .then(data => {return(data.data.User)})
      .catch(error => {return({errors: error})});
    }
  },
  Mutation: {
    sendTokens: (_, data) => {
      return sendTokens(data)
    },
    confirmUser: (_, data) => {
      return confirmUser(data)
    }
  },
};