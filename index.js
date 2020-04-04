const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const models = require('./database/models')

const path = require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const cors =  require('cors')

const PORT = 8080;

const app = express();
const endPoint = `/graphql`

app.use(cors())
app.use(express.json())

// Here instead of importing schemas and resolvers manually we use this library called merge-graphql-schemas to help with the procedure

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:{
      models,
        user:{
          id:1
        }
    },
    playground:{
        endpoint: endPoint
    }
});
// add any middleware by typing it after the path (path, jwtAuth)
// app.use(path)


server.applyMiddleware({ app });
models.sequelize.sync().then(()=>{
    app.listen({ port: PORT }, () =>
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    )
})
