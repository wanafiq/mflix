export const typeDef = `
  type Query {
    user: User
  }
  
  type Mutation {
    createUser(name: String!): User
  }
  
  type User {
    id: Int
    name: String
  }
`;

export const resolvers = {
  Query: {
    user: () => {
      return {
        id: 1,
        name: "wan",
      };
    },
  },

  Mutation: {
    createUser: (_, { name }) => {
      // insert to db

      return {
        id: 1,
        name,
      };
    },
  },

  User: {
    name: (obj) => {
      return obj.name.toUpperCase();
    },
  },
};
