import { ObjectId } from "mongodb";

export const typeDef = `
  type Query {
    users(input: Pagination): [User!]!
    user(id: ID!): User
  }
  
  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean
  }
  
  input CreateUserInput {
    name: String!
    email: String!
  }
  
  input UpdateUserInput {
    name: String!
  }
  
  input Pagination {
    limit: Int
  }
  
  type User {
    id: ID!
    name: String
    email: String
  }
`;

// arguments (obj, args, context)
export const resolvers = {
  Query: {
    users: async (_, { limit }, { mongo }) => {
      if (!limit) {
        limit = 20;
      }

      return await mongo.users.find().limit(limit).toArray();
    },
    user: async (_, { id }, { mongo }) => {
      return await mongo.users.findOne({
        _id: new ObjectId(id),
      });
    },
  },

  Mutation: {
    createUser: async (_, { input }, { mongo }) => {
      const response = await mongo.users.insertOne(input);
      return {
        _id: response.insertedId,
        ...input,
      };
    },
    updateUser: async (_, { id, input }, { mongo }) => {
      const filter = { _id: new ObjectId(id) };
      const update = { $set: { name: input.name } };
      const options = { returnDocument: "after" };
      return await mongo.users.findOneAndUpdate(filter, update, options);
    },
    deleteUser: async (_, { id }, { mongo }) => {
      const deleted = await mongo.users.deleteOne({ _id: new ObjectId(id) });
      return deleted.acknowledged === true;
    },
  },

  User: {
    id: ({ _id }) => {
      return _id; // mongo id is `_id`, we wanted to display as `id`
    },
    name: (obj) => {
      return obj.name.toUpperCase();
    },
  },
};
