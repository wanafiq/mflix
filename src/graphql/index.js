import { createSchema } from "graphql-yoga";
import lodash from "lodash";

import { typeDef as User, resolvers as UserResolvers } from "./models/user.js";

const queries = `
  type Query {
    health: String
  }
`;

const resolvers = {
  Query: {
    health: () => "OK",
  },
};

export const schema = createSchema({
  typeDefs: [queries, User],
  resolvers: lodash.merge(resolvers, UserResolvers),
});
