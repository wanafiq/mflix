const { graphql, buildSchema } = require("graphql");
var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { ruruHTML } = require("ruru/server");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} = require("graphql/type");

const User = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: GraphQLInt,
    },
    isAdmin: {
      type: GraphQLBoolean,
    },
    name: {
      type: GraphQLString,
      resolve: (obj) => {
        const name = obj.name.trim().toUpperCase();
        if (obj.isAdmin) {
          return `${name} (Admin)`;
        }
        return name;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "Hello World",
      },
      user: {
        type: User,
        resolve: () => {
          return {
            id: 1,
            isAdmin: true,
            name: "Wan",
          };
        },
      },
    },
  }),
});

const app = express();

app.all(
  "/graphql",
  createHandler({
    schema: schema,
  }),
);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(8080);
console.log("Api running on : http://localhost:8080");
