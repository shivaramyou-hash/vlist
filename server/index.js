require = require("esm")(module);
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} = require("@apollo/server/plugin/landingPage/default");
const express = require("express");
const http = require("http");
const { json } = require("body-parser");
const typeDefs = require("./src/graphql/graphql-schema");
const resolvers = require("./src/graphql/graphql-resolvers");
require("dotenv").config();
// const uploadRoute = require("./modules/upload/upload.routes");

const cors = require("cors");
const { verifyToken } = require("./src/utilities/verifyToken");
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== "production",
  plugins: [
    // Install a landing page plugin based on NODE_ENV
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: "my-graph-id@my-graph-variant",
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
});

const runServer = async () => {
  await server.start();

  //   app.use(
  //     "/api/v1/upload",
  //     cors({
  //       origin: ["http://localhost:3000"],
  //     }),
  //     uploadRoute
  //   );

  app.use(
    "/api/v1/graphql",
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://vlistportal-client-kczx4vna7q-as.a.run.app",
        "https://vlistportal-client-typn62kt6q-as.a.run.app",
        "https://vlistportal-client1-typn62kt6q-as.a.run.app",
        "https://vlist.humanwrk.com",
        "https://vlist-client-mja6e47euq-as.a.run.app",
        "https://vlist-client-883119806742.asia-southeast1.run.app",
        "https://vlist-client-33040848764.asia-southeast1.run.app",
        "https://vlist-git-color-shivarams-projects-b0d524d5.vercel.app",
        "https://vlist-one.vercel.app",
        "https://vlist-one.vercel.app/",
        "https://vlist-one.vercel.app/api/v1/graphql",
        "https://vlist-one.vercel.app/login"
      ],
    }),
    json({ limit: "100mb" }),
    expressMiddleware(server, {
      context: verifyToken,
    })
  );

  const port = process.env.PORT || 4000;

 await new Promise((resolve) =>
  httpServer.listen(port, "0.0.0.0", resolve)
);
  console.log(`🚀 Server ready at http://localhost:${port}/api/v1/graphql`);
};

runServer();
