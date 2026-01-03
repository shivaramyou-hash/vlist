require = require("esm")(module);

const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} = require("@apollo/server/plugin/landingPage/default");

const typeDefs = require("./src/graphql/graphql-schema");
const resolvers = require("./src/graphql/graphql-resolvers");
const { verifyToken } = require("./src/utilities/verifyToken");

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== "production",
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
});

const startServer = async () => {
  await server.start();

  app.use(
    "/api/v1/graphql",
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://vlist.humanwrk.com",
        "https://vlist-one.vercel.app",
      ],
      credentials: true,
      methods: ["GET", "POST", "OPTIONS"],
    }),
    express.json({ limit: "100mb" }),
    expressMiddleware(server, {
      context: verifyToken,
    })
  );

  const port = process.env.PORT || 4000;

  httpServer.listen(port, "0.0.0.0", () => {
    console.log(
      `🚀 Server running on port ${port} (${process.env.NODE_ENV})`
    );
  });
};

startServer();

module.exports = app;
