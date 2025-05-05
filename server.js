import express from "express";
import { ruruHTML } from "ruru/server";
import { createYoga, createSchema } from "graphql-yoga";

import { schema } from "./src/graphql/index.js";

const yoga = createYoga({ schema });

const app = express();

app.all("/graphql", yoga);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(8080);
console.log("Api running on : http://localhost:8080");
