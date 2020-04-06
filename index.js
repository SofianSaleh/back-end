const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const models = require("./database/models");

const path = require("path");
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require("merge-graphql-schemas");

const { refreshTokens } = require("./auth");
const jwt = require("jsonwebtoken");

const cors = require("cors");

require("dotenv").config();

const PORT = 8080;

const app = express();
const endPoint = `/graphql`;

app.use(cors());
app.use(express.json());

const addUser = async (req, res, next) => {
  const token = req.headers["x-token"];
  if (token) {
    try {
      const { user } = jwt.verify(token, process.env.SECRET);
      req.user = user;
      console.log(req.user);
    } catch (err) {
      const refreshToken = req.headers["x-refresh-token"];
      const newTokens = await refreshTokens(
        token,
        refreshToken,
        models,
        process.env.SECRET,
        process.env.SECRET2
      );
      if (newTokens.token && newTokens.refreshToken) {
        res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
        res.set("x-token", newTokens.token);
        res.set("x-refresh-token", newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
};

// Here instead of importing schemas and resolvers manually we use this library called merge-graphql-schemas to help with the procedure

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);
app.use(path, addUser);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (req.headers[`x-token`]) {
      console.log(req.headers, `-----=-=-=-=-=-=-=-=-`);
      const data = await addUser(req);
    }
    return {
      models,
      user: req.user,
      SECRET: process.env.SECRET,
      SECRET2: process.env.SECRET2,
    };
  },
  playground: {
    endpoint: endPoint,
  },
});
// add any middleware by typing it after the path (path, jwtAuth)
// app.use(path)

server.applyMiddleware({ app });
models.sequelize.sync().then(() => {
  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
});
