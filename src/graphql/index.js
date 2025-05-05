import { createSchema } from "graphql-yoga";
import lodash from "lodash";

import { typeDef as User, resolvers as UserResolvers } from "./models/user.js";
import {
  typeDef as Comment,
  resolvers as CommentResolvers,
} from "./models/comment.js";

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
  typeDefs: [queries, User, Comment],
  resolvers: lodash.merge(resolvers, UserResolvers, CommentResolvers),
});
