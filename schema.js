/**
 ** types -> it could be null
 *# String, Int, Float, Boolean, ID
 ** ! -> *Required
 ** [] -> array
 ** []! -> It couldt be null
 ** [String!] -> type of string in array couldt be null 
 */
export const typeDefs = `#graphql
  type Game {
    id: ID!
    is: Boolean
    title: String!
    platform: [String!]!
    reviews: [Review!]
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game
    author: Author
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }
  # ! ENTRY POINTS !
  type Query {
    games: [Game]
    reviews: [Review]
    authors: [Author]
    review(id: ID!): Review
    author(id: ID!): Author
    game(id: ID!): Game
  }
  # ! MUTATION !
  type Mutation {
    delete_game(id:ID!): [Game]
    delete_author(id:ID!): [Author]
    delete_review(id:ID!): [Review]
    add_game(game:add_Input_Game): [Game] # Game
    update_game(id:ID!, edits:edit_Input_Game!): [Game] # Game
  }
  input add_Input_Game {
    title:String!,
    platform: [String!]!
  }
  input edit_Input_Game {
    title:String,
    platform: [String!]
  }
`
// # Schema needs to have it
// # Query type is not optional at all
// @ It defines the enntry points and return types of those entry points

// # Input Type - allows tp group togetehr several args into one type and then can be used as single arg