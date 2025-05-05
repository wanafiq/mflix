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
    createUser: async (_, { user }, { mongo }) => {
      const movies = await mongo.users.find().toArray();
      console.log(movies);

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
