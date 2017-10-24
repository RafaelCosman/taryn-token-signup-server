const sendTokens = require('./sendTokens');
const db = require("../models/index")

var client = require('graphql-client')({
  url: "https://api.graph.cool/simple/v1/cj8m6ujrq0evm0167mhdi4mta",
  headers: {
  }
})

import confirmUser from "./confirmUser";
import createUser from "./createUser";

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
    },
    tokenGift: (_, data) => {
      return db.TokenGift.findAll({
        where: {id: data.id}
      })
      .then(g => {
          console.log(g[0].dataValues)
          return(g[0].dataValues)
      })
      .catch(error => {return({errors: error})});
    }
  },
  Mutation: {
    sendTokens: (_, data) => {
      return sendTokens(data)
    },
    confirmEmail: (_, data) => {
      return confirmUser(data)
    },
    createUser: (_, data) => {
      return createUser(data)
    },
    createTokenGift: () => {
      setTimeout(() => {console.log("HI"), 4000})
      return db.TokenGift.create({})
      .then(u => {
          return(u.dataValues)
      })
    }
  },
};