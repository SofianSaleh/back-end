const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const models = require('./database/models')

const path = require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const PORT = 8080;

const app = express();
const endPoint = `/graphql`

app.use(express.json())

// Here instead of importing schemas and resolvers manually we use this library called merge-graphql-schemas to help with the procedure

const types = fileLoader(path.join(__dirname, './schema'));
const resolvers = fileLoader(path.join(__dirname, './resolvers'));

const typeDefs =  mergeTypes(types);
const resolvers = mergeResolvers(resolvers)

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground:{
        endpoint: endPoint,
        settings:{"editor.theme":"dark"
        }
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
