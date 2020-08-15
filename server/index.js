const connect = require('connect');


const { ApolloServer, gql } = require('apollo-server-express');
const query = require('qs-middleware');
const users =[
    {
        id : '01',
        username : "Yoda",
        avatar : "http:yoda.png"
    },
    {
        id : '02',
        username : "Rick Sanchez",
        avatar : "http:yoda.png"

    },
]
//The GraphQL schema in string form
const typeDefs = gql `
 type User {
    id : ID!, 
    username : String,
     avatar : String
 }
 type Query{
     users : User!
 }
`
const resolvers={
    Query:{
        users() {
            return{
                id : '01',
                username : "Yoda",
                avatar : "http:yoda.png"
            }
        }
    }
}


const server = new ApolloServer({ typeDefs, resolvers });

const app = connect();
const path = '/graphql';

app.use(query());
server.applyMiddleware({ app, path });
app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);