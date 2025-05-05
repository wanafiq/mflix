export const typeDef = `
  type Query {
    user: User
  }
  
  type Mutation {
    createUser(user: CreateUserInput!): User
  }
  
  input CreateUserInput {
    name: String
    age: Int
  }
  
  type User {
    id: Int
    name: String
    age: Int
  }
`;

export const resolvers = {
  Query: {
    user: () => {
      return {
        id: 1,
        name: "wan",
        age: 18,
      };
    },
  },

  Mutation: {
    createUser: (_, { user }) => {
      // insert to db

      return {
        id: 1,
        ...user,
      };
    },
  },

  User: {
    name: (obj) => {
      return obj.name.toUpperCase();
    },
  },
};
