import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { Employee } from "./employee";
import bodyParser from "body-parser";
import { User } from "./user";


export async function initServer() {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());   

    const graphqlServer = new ApolloServer<any>({
        typeDefs: `
           ${Employee.types}
           ${User.types}
    
            type Query {
                ${Employee.queries} 
                ${User.queries}
            }

            type Mutation { 
              ${Employee.mutations}
            }
        `,
        resolvers: {
          Query: {
            ...Employee.resolvers.queries,
            ...User.resolvers.queries
          },

          Mutation: {
            ...Employee.resolvers.mutations
          }
        },
      });
        
      await graphqlServer.start();
      app.use("/graphql" , expressMiddleware(graphqlServer) );
      return app;

};