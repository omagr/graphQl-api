# GraphQL

- graphql is what's known as a query language which is what the ql in the name stands for query language.
- by query language we mean a specific syntax that we can use **to query a server to request or mutate data**
- so it's kind of like an alternative to the more traditional approach of sending standard requests to a rest API using endpoints but whereas using a rest API is more of an **architectural style an approach to serve and fetching data**
- graphql differs in that it's an actual query language with its own syntax and rules and it still uses HTTP requests under the HUD like we'd normally send to a rest API it's just that we have this nice query language sitting on top of that to give us more flexibility and control about how we make them and what data we want to fetch or mutate and also the way a graphql server handles those requests is very different to how a typical rest API would handle them.

### Why GraphQL over RESTapi ?

- **Over Fetching**
    - getting back more than what we want!
- **Under Fetching**
    - getting back less than what we want!

## *For Example (over-fetching)*

api -> **site/api/course/1**

```jsx
{
	id: 1
	title: ''
	author:
	price:
}
```

we want, only id and title

## *For Example (under-fetching)*

api → **site/api/course/1**

```jsx
{
	id: 1
	title: ''
	author:
	price:
}
```

we want, other course by the author. then?

ofc another req → **site/api/author/1**

# Solution: GraphQL

single req → **site/graphql**

```jsx
Query {
	course(id:1) {
		id, 
		title
			author {
			name,
			id,
			courses {
				id,
				title,
				price
			}
		}
	}
}
```

# Query #FrontEnd
```jsx
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
```