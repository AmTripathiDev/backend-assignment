import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";

export async function initServer() {
    const app = express();
    const graphQlServer= new ApolloServer({typeDefs: '' , resolvers: []});
    await graphQlServer.start();
    app.use('/graphql', expressMiddleware(graphQlServer))
    return app;
};