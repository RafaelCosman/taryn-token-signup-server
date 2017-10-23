const sendTokens = require('./sendTokens');
// const ApolloClient = require("apollo-client");
// const createNetworkInterface = require("apollo-client").createNetworkInterface;
// const networkInterface = createNetworkInterface({ uri: "https://api.graph.cool/simple/v1/cj8m6ujrq0evm0167mhdi4mta" });
const gql = require('graphql-tag');

// const client = new ApolloClient({
//   networkInterface,
// });

module.exports = {
  Query: {
    user: (_, data) => {
      // client.query({
      //   query: gql`
      //     query {
      //       User(id:"cj94ks85w05fg0156ctn0bxkw"){
      //         id
      //       }
      //     }
      //   `
      // })
      // .then(data => console.log(data))
      // .catch(error => console.error(error));
      return {id: 344}
    }
  },
  Mutation: {
    sendTokens: (_, data) => {
      return sendTokens(data)
    }
  },
};