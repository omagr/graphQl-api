/** 
--- Normal Query
query Query {
    games {
        title, platform
    }
}
--- Query Variables
query Query($id: ID!) {
    game(id: $id) {
        platform, title
    }
}
--- Related Data
query Query($id: ID!) {
    game(id: $id) {
        title, reviews {
            rating, content
        }
    }
}

query Query($id: ID!) {
    review(id: $id) {
        rating,
            game {
            id, platform
        },
      author {
            name, verified
        }
    }
}
--- Resolver Chain
query Query($id: ID!) {
    review(id: $id) {
        rating,
            game {
            id, platform,
                reviews {
                content, rating
            }
        },
      author {
            name, verified
        }
    }
}
--- Mutation [Delete]
mutation delete_game($id: ID!) {
    delete_game(id: $id) {
        title, id
    }
}
--- Mutation [Add]
mutation add_game($game:add_Input_Game!) {
  add_game (game: $game)  {
    id, title, platform
  } 
}
--- Mutation [Update]
mutation edit_game($id:ID!, $edits:edit_Input_Game!) {
  update_game (edits: $edits, id: $id)  {
   title, platform
  } 
}
*/
