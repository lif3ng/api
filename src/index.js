const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models');

const port = process.env.PORT || 4000;

const DB_HOST = process.env.DB_HOST;

const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }

  type Mutation {
    newNote(content: String!): Note!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hello',
    notes: async () => await models.Note.find(),
    note: async (parent, args) => await models.Note.findById(args.id)
  },
  Mutation: {
    newNote: async (parent, args) =>
      await models.Note.create({
        content: args.content,
        author: 'a author str'
      })
  }
};

const app = express();

db.connect(DB_HOST);

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/api' });
app.listen({ port }, () => {
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  );
});
