const express =  require("express");
const { graphqlExpress } = require('apollo-server-express');
const typeDefs = require("./schema")

const PORT = 8080;

const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', express.json(), graphqlExpress({ schema: typeDefs }));

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));

