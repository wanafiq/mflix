import express from "express";
import { ruruHTML } from "ruru/server";
import { createYoga } from "graphql-yoga";

import "dotenv/config.js";
import { setupDatabase } from "./src/mongo/index.js";
import { schema } from "./src/graphql/index.js";

const yoga = createYoga({
  schema,
  context: async () => {
    const mongo = await setupDatabase();
    return {
      mongo,
    };
  },
});

const app = express();

app.all("/graphql", yoga);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(8080);
console.log("Api running on : http://localhost:8080");
