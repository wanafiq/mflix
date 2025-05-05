const { graphql, buildSchema } = require("graphql");
var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    age: Int 
   } 
`);

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  hello() {
    return "Hello world!!";
  },
  age() {
    return 14;
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

app.listen(8080);
console.log("Api running on : http://localhost:8080");
