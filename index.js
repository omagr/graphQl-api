// # it is first to setyp server, configure it and tell apollo how to handle all of different data and repond quries
import { ApolloServer } from '@apollo/server';
// # it is just to start up the server so we can start listening for requests
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './db.js';

/**
 * *A schema is a collection of type definitions (hence "typeDefs")
 * *that together define the "shape" of queries that are executed against your data.
 */

/*
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;
*/
// ! HANDLE QUREIES ! 
const resolvers = {
  Query: {
    //* Every single request go through here first!
    games() {
      return db.games
    },
    reviews() {
      return db.reviews
    },
    authors() {
      return db.authors
    },
    review(parent, args, context) {
      return db.reviews.find(review => review.id == args.id)
    },
    game(parent, args, context) {
      //* Game
      return db.games.find(game => game.id == args.id)
    },
    author(parent, args, context) {
      //* Author
      return db.authors.find(author => author.id == args.id)
    }
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter(r => r.game_id === parent.id)
    }
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter(r => r.author_id === parent.id)
    }
  },
  Review: {
    author(parent) {
      return db.authors.find(a => a.id === parent.author_id)
    },
    game(parent) {
      return db.games.find(g => g.id === parent.game_id)
    },
  },
  Mutation: {
    delete_game(_, args) {
      db.games = db.games.filter(g => g.id !== args.id)
      return db.games
    },
    delete_review(_, args) {
      db.reviews = db.reviews.filter(r => r.id !== args.id)
      return db.reviews
    },
    delete_author(_, args) {
      db.authors = db.authors.filter(a => a.id !== args.id)
      return db.authors
    },
    add_game(_, args) {
      const game = {
        ...args.game,
        id: Math.floor(Math.random() * 1000 + 4).toString()
      }
      db.games.push(game);
      return db.games
    },
    update_game(_, args) {
      db.games = db.games.map(g => {
        if (g.id == args.id) {
          return { ...g, ...args.edits }
        }
      })
      return db.games
    }
  }
}
const server = new ApolloServer({
  // * type definition - it is description for our data types and relationship they have with outher data types
  typeDefs,
  // * resolver - bunch of resolver functions that determine how we respond to queries for deifferent data on the graph
  resolvers
})

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } })
console.log(`${url} is working`)