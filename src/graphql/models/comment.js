export const typeDef = `
  type Query {
    comments(input: Pagination): [Comment!]!
  }
 
  input Pagination {
    limit: Int
  }
  
  type Comment {
    id: ID!
    text: String
    email: String
    user: User
  }
`;

// arguments (obj, args, context)
export const resolvers = {
  Query: {
    comments: async (_, { limit }, { mongo }) => {
      if (!limit) {
        limit = 20;
      }

      return await mongo.comments.find().limit(limit).toArray();
    },
  },

  Comment: {
    id: ({ _id }) => {
      return _id; // mongo id is `_id`, we wanted to display as `id`
    },
    user: ({ email }, args, { mongo }) => {
      return mongo.users.findOne({ email });
    },
  },
};
