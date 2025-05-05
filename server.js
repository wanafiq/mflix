const { graphql, buildSchema } = require("graphql");
var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { ruruHTML } = require("ruru/server");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello(name: String!): String
    age: Int
    weight: Float
    isOver18: Boolean
    hobbies: [String]
   } 
`);

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  hello: ({ name }) => {
    return "Hello " + name;
  },
  age: () => {
    return 14;
  },
  weight: () => {
    return 64.2;
  },
  isOver18: () => {
    return true;
  },
  hobbies: () => {
    return ["movies, gaming, eating, traveling"];
  },
};

const app = express();

app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: rootValue,
  }),
);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(8080);
console.log("Api running on : http://localhost:8080");
