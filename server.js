import express from "express";
import { createYoga, createSchema } from "graphql-yoga";
import { ruruHTML } from "ruru/server";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello from Yoga!",
      },
    },
  }),
});

const app = express();

app.all("/graphql", yoga);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(8080);
console.log("Api running on : http://localhost:8080");
