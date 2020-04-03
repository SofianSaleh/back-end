const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require("./schema")
const resolvers = require("./resolvers")

const models = require('./database/models')


const PORT = 8080;

const app = express();
const path = `/graphql`

app.use(express.json())

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground:{
        endpoint: path,
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
